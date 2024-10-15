import { configureStore } from '@reduxjs/toolkit'
import moviereducer from './reducers/Movieslice'
import personreducer from './reducers/Personslice'
import tvreducer from './reducers/Tvslice'

export const store = configureStore({
  reducer: {
    movie: moviereducer,
    person: personreducer,
    tv: tvreducer,
  },
})