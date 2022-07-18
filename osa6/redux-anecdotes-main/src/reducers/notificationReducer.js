import { createSlice } from '@reduxjs/toolkit'

const initialState = 'test message'

const notificationSlice = createSlice({
  name: 'notification',                                      // name-parametri määrittelee etuliitteen, jota käytetään actioneiden type-arvoissa
  initialState,
  reducers: {                                               // parametri reducers määrittelee itse reducerin objektina, jonka funktiot käsittelevät tietyn actionin aiheuttamat tilamuutokset
    show(state, action) {
      return state
    },
  }
})

export default notificationSlice.reducer
