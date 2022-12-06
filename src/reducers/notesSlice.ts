import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { RootState } from '../store'
import { Note } from 'models/note'

// Define a type for the slice state
interface NotesState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  data: Note[]
}

// Define the initial state using that type
const initialState: NotesState = {
  status: 'idle',
  error: null,
  data: [],
}

export const NotesSlice = createSlice({
  name: 'Notes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    noteAdded: (state, action: PayloadAction<Note>) => {
      state.data.push(action.payload)
    },
    noteDeleted: (state, action: PayloadAction<Note>) => {
      state.data = state.data.filter((ele) => ele.id !== action.payload.id)
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    noteUPdated: (state, action: PayloadAction<Note>) => {
      const index = state.data.findIndex((ele) => ele.id === action.payload.id)
      state.data.splice(index, 1, action.payload)
    }
  }
})

// TODO: getAllNotes, getNoteById, getNotesByCategoryAndIndustry
export const fetchNotes = createAsyncThunk('notes/fetchCards', async () => {
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
export const { noteAdded, noteDeleted, noteUPdated } = NotesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAllNotes = (state: RootState) => state.notes
export const selectNoteById = (state: RootState) => state.notes
// export const selectAllNotes = (state: RootState) => state.Notes

export default NotesSlice.reducer
