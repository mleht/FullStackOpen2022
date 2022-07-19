import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',                                      
  initialState,
  reducers: {                                               
    searchFilter(state, action) {
      return action.payload
    }
  }
})

export const { searchFilter } = filterSlice.actions
export default filterSlice.reducer
