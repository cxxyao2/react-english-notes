import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import type { RootState } from '../store'
import { Note } from 'models/note'

// Define a type for the slice state
interface TopicsState {
  status:'idle' | 'loading' |'succeeded'|'failed'
  error: string | null
  data:Note[]
}

// Define the initial state using that type
const initialState: TopicsState = {
  status:'idle',
  error:null,
  data: []
}

export const TopicsSlice = createSlice({
  name: 'Topics',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    allTopicsGotten: (state,action: PayloadAction<Note>) => {
      state.data.push(action.payload) // TODO
    },
    cardUpdated: (state,action: PayloadAction<Note>) => {
      const {id,content} = action.payload
      const existingCard = state.data.find(ele=>ele.id === id)
      if(existingCard) {
        existingCard.content = content
      }
    },

  },
})

export const { allTopicsGotten, cardUpdated } = TopicsSlice.actions

export const fetchTopics = createAsyncThunk('cards/fetchCards', async () => {
  const response = await getDocs(collection(db, 'cards'))
  const cards: Note[] = []
  response.forEach((doc) => {
    cards.push({
      language: doc.data().language || 'en',
      category: 'word',
      keyword: doc.data().keyword,
      created: (doc.data().created.toDate() as Date).getTime() || new Date().getTime(),
      content: doc.data().content,
      industry: doc.data().industry || 'IT',
      mastered: doc.data().mastered || false,
      hitCounter: doc.data().hitCounter || 1,
      id: doc.id,
      initId: doc.data().initId
    })
  })

  cards.sort((a, b) => (a.created > b.created ? -1 : 1))
  return cards
})
// Other code such as selectors can use the imported `RootState` type

export default TopicsSlice.reducer