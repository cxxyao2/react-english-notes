import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import type { RootState } from '../store'
import { Note } from 'models/note'
import { getNoteFromDocument } from 'services/notes-service'
import { initTopicData } from '../constants'

// Define a type for the slice state
interface TopicsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
  data: Note[]
}

// Define the initial state using that type
const initialState: TopicsState = {
  status: 'idle',
  error: null,
  data: initTopicData
}

export const updateTopic = createAsyncThunk(
  'topics/updateTopic',
  async (topic: Partial<Note>) => {
    const { id, ...rest } = topic
    const docRef = doc(db, 'topics', id!)
    await updateDoc(docRef, { ...rest })
    return topic
  }
)

export const fetchTopics = createAsyncThunk('topics/fetchTopics', async () => {
  const response = await getDocs(collection(db, 'topics'))
  const Topics: Note[] = []
  response.forEach((doc) => {
    const docu = doc.data()
    const note = getNoteFromDocument(docu, doc.id)
    Topics.push(note)
  })

  Topics.sort((a, b) => (a.created > b.created ? -1 : 1))
  return Topics
})

export const TopicsSlice = createSlice({
  name: 'Topics',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // extraReducers: {
    builder.addCase(fetchTopics.pending, (state: TopicsState) => {
      state.status = 'loading'
    })
    builder.addCase(
      fetchTopics.fulfilled,
      (state: TopicsState, action: PayloadAction<Note[]>) => {
        state.status = 'succeeded'
        state.data = action.payload
      }
    )
    builder.addCase(fetchTopics.rejected, (state: TopicsState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(updateTopic.pending, (state: TopicsState) => {
      state.status = 'loading'
    })

    builder.addCase(
      updateTopic.fulfilled,
      (state: TopicsState, action: PayloadAction<Partial<Note>>) => {
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
    builder.addCase(updateTopic.rejected, (state: TopicsState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const selectAllTopics = (state: RootState) => state.topics.data
export const selectTopicById = (state: RootState, TopicId: string) =>
  state.topics.data.find((ele) => ele.id === TopicId)

// Other code such as selectors can use the imported `RootState` type

export default TopicsSlice.reducer
