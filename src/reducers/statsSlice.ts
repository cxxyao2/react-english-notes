import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase'

import type { RootState } from '../store'
import { Stats } from 'models/stats'
import { initNavbarData } from '../constants'


// Define a type for the slice state
interface StatsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
  data: Stats[]
}

// Define the initial state using that type
const initialState: StatsState = {
  status: 'idle',
  error: null,
  data: initNavbarData
}

export const updateStat = createAsyncThunk(
  'Stats/updateStat',
  async (newStat: Stats, _) => {
    const { id, ...rest } = newStat
    const docRef = doc(db, 'stats', id!)
    await updateDoc(docRef, { ...rest })
    return newStat
  }
)

export const getStatsFromDocument = (doc: DocumentData, id: string): Stats => {
  return {
    id: id,
    name: doc.name,
    mastered: doc.mastered,
    unmastered: doc.unmastered
  }
}

export const fetchStats = createAsyncThunk('Stats/fetchStats', async () => {
  const response = await getDocs(collection(db, 'stats'))
  const stats: Stats[] = []
  response.forEach((doc) => {
    const docu = doc.data()
    const stat = getStatsFromDocument(docu, doc.id)
    stats.push(stat)
  })

  return stats
})

export const StatsSlice = createSlice({
  name: 'Stats',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStats.pending, (state: StatsState) => {
      state.status = 'loading'
    })
    builder.addCase(
      fetchStats.fulfilled,
      (state: StatsState, action: PayloadAction<Stats[]>) => {
        state.status = 'succeeded'
        state.data = action.payload
      }
    )
    builder.addCase(fetchStats.rejected, (state: StatsState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(updateStat.pending, (state: StatsState) => {
      state.status = 'loading'
    })
    builder.addCase(
      updateStat.fulfilled,
      (state: StatsState, action: PayloadAction<Partial<Stats>>) => {
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
    builder.addCase(updateStat.rejected, (state: StatsState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const selectAllStats = (state: RootState) => state.stats.data
export const selectStatById = (state: RootState, statId: string) =>
  state.stats.data.find((ele) => ele.id === statId)

// Other code such as selectors can use the imported `RootState` type


export default StatsSlice.reducer
