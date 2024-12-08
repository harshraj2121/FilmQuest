import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header({data}) {
 

  
    return (
    <div style={{
        background : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${data.poster_path || data.backdrop_path})`,
        backgroundPosition: 'top 10%',
        backgroundSize: 'cover'
    }} className='w-full h-[60vh] flex flex-col items-start justify-end p-[8%]'>
        <h1 className='text-white w-[70%] text-5xl font-bold'>{data.original_title || data.name || data.title || data.original_name}</h1>
        <p className='text-white py-2 w-[70%]'>{data.overview.slice(0, 200)}
          <Link to={`${data.media_type}/details/${data.id}`} className='text-blue-400'> show more...</Link>
        </p>
        <p className='text-white mb-3'>
          <i className="text-yellow-400 pr-1 ri-megaphone-fill"></i>{data.release_date || "No Information"}
          <i className="text-yellow-400 ml-4 pr-1 ri-album-line"></i>{data.media_type.toUpperCase()}
        </p>
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='bg-[#6556CD] p-3 text-white font-bold rounded'>Watch Trailer</Link>
    </div>
  )
}

export default Header