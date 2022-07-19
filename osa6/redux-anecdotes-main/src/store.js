import { configureStore } from '@reduxjs/toolkit'
import anecdoteSliceReducer from './reducers/anecdoteSliceReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdoteSliceReducer,
    notificationReducer
  }
})

export default store