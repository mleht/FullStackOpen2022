import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',                                      // name-parametri määrittelee etuliitteen, jota käytetään actioneiden type-arvoissa
  initialState,
  reducers: {                                               // parametri reducers määrittelee itse reducerin objektina, jonka funktiot käsittelevät tietyn actionin aiheuttamat tilamuutokset
    show(state, action) {
      return action.payload
    },
    hide(state, action){
      return action.payload
    }
  }
})

export const notification = (notificationMessage, time) => {
  return (dispatch) => {
    dispatch(show(notificationMessage))
    setTimeout(() => {
      dispatch(hide(''))
    }, time * 1000)
  }
}


export const { show, hide } = notificationSlice.actions
export default notificationSlice.reducer
