import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshow from './components/Tvshow'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetails from './components/PersonDetails'
import Trailer from './components/partials/Trailer'


function App() {
  return <>
    <div className='select-none h-screen w-full bg-[#1f1e24]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />}/>
        <Route path='/popular' element={<Popular />}/>

        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<MovieDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>


        <Route path='/tv_show' element={<Tvshow />} />
        <Route path='/tv/details/:id' element={<TvDetails />} >
        <Route path='trailer' element={<Trailer/>}/>
        </Route>

        <Route path='/people' element={<People />} />
        <Route path='/person/details/:id' element={<PersonDetails />}/>

      </Routes>
    </div>
  </>
}

export default App