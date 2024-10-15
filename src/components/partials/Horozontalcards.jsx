import React from 'react'
import noimage from '/noImage.jpg'
import { Link } from 'react-router-dom'

function Horozontalcards({data, func}) {
  // console.log(data)
  return (
    <div className='w-full h-[66vh] mb-6 px-5'>

        <div className='w-[100%] h-[55vh] flex overflow-y-hidden'>
            {data.map((d, i) => (<Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[30vh] w-[15%] h-[98%] mr-5 bg-zinc-900'>
                <img className='w-full h-[55%] object-cover' src={d.backdrop_path || d.poster_path || d.known_for.backdrop_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path || d.known_for.backdrop_path}` : noimage} alt="" />
              <div className='text-white p-3 h-[45%]'>
                <h1 className='text-xl font-bold'>{d.original_title || d.name || d.title || d.original_name}</h1>
                <p className='text-sm py-2'>{d.overview ? `${d.overview.slice(0,120)}...` : 'No overview available'}</p>
              </div>
            </Link>))}

        </div>


    </div>
  )
}

export default Horozontalcards