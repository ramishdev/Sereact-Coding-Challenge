import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}
// Initial state
const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    // Decrement by amount
    decrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.value - action.payload > 0) {
        state.value -= action.payload;
      }
      else {
        state.value = 0;
      }
    },
    // Set to a specific amount
    setAmount: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        state.value = action.payload;
      }
      else {
        state.value = 0;
      }
    },
    decrement: (state) => {
      // to prevent negative values
      if (state.value > 0) {
        state.value -= 1
      }
    },
    reset: () => initialState,  // reset the counter
  },
})

export const { increment, incrementByAmount, decrement, decrementByAmount, setAmount, reset } = counterSlice.actions

export default counterSlice.reducer