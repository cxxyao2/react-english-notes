import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Stats } from 'models/stats'


// Define a type for the slice state
interface StatsState {
  status:'idle' | 'loading' |'succeeded'|'failed'
  error: string | null
  data:Stats[]


}

// Define the initial state using that type
const initialState: StatsState = {
  status:'idle',
  error:null,
  data: []
}

export const StatsSlice = createSlice({
  name: 'Stats',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    allStatsGotten: (state,action: PayloadAction<Stats>) => {
      state.data.push(action.payload) // TODO
    },
    statsUpdated: (state,action: PayloadAction<Stats>) => {
      const index = state.data.findIndex(ele=>ele.id === action.payload.id)
      if(!!index) state.data.splice(index,1, action.payload)
    },

  },
})

export const { allStatsGotten, statsUpdated } = StatsSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default StatsSlice.reducer