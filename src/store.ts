//import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
//import logger from 'redux-logger'
import cardsReducer from './reducers/cardsSlice'
import notesReducer from './reducers/notesSlice'
import statsReducer from './reducers/statsSlice'
import topicsReducer from './reducers/topicsSlice'

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    notes: notesReducer,
    stats: statsReducer,
    topics: topicsReducer
  }
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
