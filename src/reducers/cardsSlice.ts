import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import type { RootState } from '../store'
import { Note } from 'models/note'

// Define a type for the slice state
interface CardsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  data: Note[]
}

// Define the initial state using that type
const initialState: CardsState = {
  status: 'idle',
  error: null,
  data: []
}

export const CardsSlice = createSlice({
  name: 'Cards',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    allCardsGotten: (state, action: PayloadAction<Note[]>) => {
      const newdata = action.payload
      newdata.forEach(rec=>state.data.push(rec))
    },
    cardUpdated: (state, action: PayloadAction<Note>) => {
      const {id,content} = action.payload
      const existingData = state.data.find((ele) => ele.id === id)
      if (existingData) {
        existingData.content = content
        existingData.updated = new Date()
      }
    }
  }
})

export const { allCardsGotten, cardUpdated } = CardsSlice.actions

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const response = await getDocs(collection(db, 'cards'))
  const cards: Note[] = []
  response.forEach((doc) => {
    cards.push({
      language: doc.data().language || 'en',
      category: 'word',
      keyword: doc.data().keyword,
      created: doc.data().created.toDate() || new Date(),
      content: doc.data().content,
      industry: doc.data().industry || 'IT',
      mastered: doc.data().mastered || false,
      hitCounter: doc.data().hitCounter || 1,
      id: doc.id,
      initId: doc.data().initId
    })
  })

  cards.sort((a, b) => (a.created.getTime() > b.created.getTime() ? -1 : 1))
  return cards
})
// Other code such as selectors can use the imported `RootState` type

export default CardsSlice.reducer
