import { configureStore } from '@reduxjs/toolkit'
import anecdoteSliceReducer from './reducers/anecdoteSliceReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdoteSliceReducer,
    notificationReducer,
    filterReducer
  }
})

export default store