import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import type { RootState } from '../store'
import { Note } from 'models/note'

import { INIT_CARD_DATA } from '../constants'
import { getNoteFromDocument } from 'utils'


// Define a type for the slice state
interface CardsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null |undefined
  data: Note[]
}

// Define the initial state using that type
const initialState: CardsState = {
  status: 'idle',
  error: null,
  data: INIT_CARD_DATA
}

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (newNote:Partial<Note>,_) => {
    const { id,...rest} = newNote
    const docRef = doc(db, 'cards', id!)
    await updateDoc(docRef, rest)
    return {...newNote}
  }
)

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
  reducers: {},
  extraReducers:(builder)=> {
    builder.addCase(fetchCards.pending, (state: CardsState) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCards.fulfilled,(
      state: CardsState,
      action: PayloadAction<Note[]>
    ) => {
      state.status = 'succeeded'
      state.data = action.payload
    })
    builder.addCase(fetchCards.rejected, (state: CardsState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase(updateCard.pending,(state: CardsState) => {
      state.status = 'loading'
    })
    builder.addCase(updateCard.fulfilled, (
      state: CardsState,
      action: PayloadAction<Partial<Note>>
    ) => {
      state.status = 'succeeded'
      const index = state.data.findIndex((ele) => ele.id === action.payload.id!)
      if (index >= 0) {
        const newNote = { ...state.data[index], ...action.payload }
        state.data.splice(index, 1, newNote)
      }
    })
    builder.addCase(updateCard.rejected,(state: CardsState, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})


export const selectAllCards = (state: RootState) => state.cards.data
export const selectCardById = (state: RootState, cardId: string) =>
  state.cards.data.find((ele) => ele.id === cardId)

// Other code such as selectors can use the imported `RootState` type

export default CardsSlice.reducer
