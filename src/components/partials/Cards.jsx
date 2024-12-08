import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noImage.jpg'


function Cards({data , title}) {
  return (
    <div className='px-[3%] flex flex-wrap w-full mt-4 bg-[#1f1e24]'>
        {data.map((c, i)=> (
            <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[25vh] mr-[3%] mb-[3%] flex-grow flex-shrink' key={i}>
                <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={c.poster_path ||c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path ||c.backdrop_path || c.profile_path}` : noimage} alt="" />
              <h1 className='text-xl text-zinc-300 mt-3 font-semibold'>{c.original_title || c.name || c.title || c.original_name}</h1>
              {c.vote_average > 0 ? (c.vote_average && (<div className='text-white absolute right-[-3%] bottom-[25%] bg-yellow-600 text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center'>{(c.vote_average*10).toFixed()} <sup>%</sup></div>)) : null}
            </Link>
        ))}
    </div>
  )
}

export default Cards