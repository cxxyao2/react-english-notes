import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../firebase'

import type { RootState } from '../store'
import { Note } from 'models/note'
import { getNoteFromDocument } from 'utils'

// Define a type for the slice state
interface NotesState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
  data: Note[]
  selectedId: string
}

// Define the initial state using that type
const initialState: NotesState = {
  status: 'idle',
  error: null,
  data: [],
  selectedId: ''
}

export const addNote = createAsyncThunk(
  'notes/addNote',
  async (note: Partial<Note>, _) => {
    const keywordArray = note.keyword!.split(' ')
    const newDoc = await addDoc(collection(db, 'notes'), {
      ...note,
      keyword: keywordArray,
      created: new Date(note.created!)
    })
    return { ...note, id: newDoc.id } as Note
  }
)

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: string, _) => {
    await deleteDoc(doc(db, 'notes', id))
    return id
  }
)

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (newNote: Partial<Note>, _) => {
    const { id, ...rest } = newNote
    const docRef = doc(db, 'notes', id!)
    await updateDoc(docRef, rest)
    return newNote
  }
)

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await getDocs(collection(db, 'notes'))
  console.log('latest notes are ', response)
  const notes: Note[] = []
  response.forEach((doc) => {
    const docu = doc.data()
    const note = getNoteFromDocument(docu, doc.id)
    notes.push(note)
  })

  notes.sort((a, b) => (a.created > b.created ? -1 : 1))
  return notes
})

export const NotesSlice = createSlice({
  name: 'Notes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedId: (state: NotesState, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state: NotesState) => {
      state.status = 'loading'
       state.error = null
    })
    builder.addCase(
      fetchNotes.fulfilled,
      (state: NotesState, action: PayloadAction<Note[]>) => {
        state.status = 'succeeded'
        state.data = action.payload
      }
    )
    builder.addCase(fetchNotes.rejected, (state: NotesState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(updateNote.pending, (state: NotesState) => {
      state.status = 'loading'
       state.error = null
    })
    builder.addCase(
      updateNote.fulfilled,
      (state: NotesState, action: PayloadAction<Partial<Note>>) => {
        state.status = 'succeeded'
        const index = state.data.findIndex(
          (ele) => ele.id === action.payload.id!
        )
        if (index >= 0) {
          const newNote = { ...state.data[index], ...action.payload }
          state.data.splice(index, 1, newNote)
        }
      }
    )
    builder.addCase(updateNote.rejected, (state: NotesState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(addNote.pending, (state: NotesState) => {
      state.status = 'loading'
       state.error = null
    })

    builder.addCase(addNote.fulfilled, (state: NotesState, action) => {
      state.status = 'succeeded'
      state.data.push(action.payload)
    })

    builder.addCase(addNote.rejected, (state: NotesState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(
      deleteNote.fulfilled,
      (state: NotesState, action: PayloadAction<string>) => {
        state.status = 'succeeded'
        const id = action.payload
        const index = state.data.findIndex((e) => e.id === id)
        if (index >= 0) state.data.splice(index, 1)
      }
    )
    builder.addCase(deleteNote.rejected, (state: NotesState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const { setSelectedId } = NotesSlice.actions
export const selectAllNotes = (state: RootState) => state.notes.data

export const noteIdSelector = createSelector(
  (state: RootState) => state.notes.data,
  (state: RootState) => state.notes.selectedId,
  (notes, id) => notes.find((note) => note.id === id)
)

export default NotesSlice.reducer
