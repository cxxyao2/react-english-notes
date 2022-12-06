import { configureStore } from '@reduxjs/toolkit'
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
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


