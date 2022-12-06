import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import type { RootState } from '../store'
import { Note } from 'models/note'
import { getNoteFromDocument } from 'services/notes-service'

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

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const response = await getDocs(collection(db, 'cards'))
  const cards: Note[] = []
  response.forEach((doc) => {
    const docu = doc.data()
    const note = getNoteFromDocument(docu, doc.id)
    cards.push(note)
  })

  cards.sort((a, b) => (a.created > b.created ? -1 : 1))
  return cards
})

export const CardsSlice = createSlice({
  name: 'Cards',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    cardUpdated: (state, action: PayloadAction<Note>) => {
      const { id, content } = action.payload
      const existingData = state.data.find((ele) => ele.id === id)
      if (existingData) {
        existingData.content = content
        existingData.updated = new Date()
      }
    }
  },
  extraReducers: {
    [fetchCards.pending.toString()]: (state: CardsState) => {
      state.status = 'loading'
    },
    [fetchCards.fulfilled.toString()]: (
      state: CardsState,
      action: PayloadAction<Note[]>
    ) => {
      state.status = 'succeeded'
      state.data = action.payload
    },
    [fetchCards.rejected.toString()]: (state: CardsState, action) => {
      console.log('error is', action.error)
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { cardUpdated } = CardsSlice.actions

export const selectAllCards = (state: RootState) => state.cards.data
export const selectCardById = (state: RootState, cardId: string) =>
  state.cards.data.find((ele) => ele.id === cardId)

// Other code such as selectors can use the imported `RootState` type

export default CardsSlice.reducer
