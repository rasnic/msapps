import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: {},
  },
  reducers: {
    add: (state,addedData) => {
      state.value[Object.keys(addedData.payload)[0]] = Object.values(addedData.payload)[0];
    },
  },
})

export const { add } = dataSlice.actions

export default dataSlice.reducer
