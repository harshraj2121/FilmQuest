import React from 'react'
import noimage from '/noImage.jpg'
import { Link } from 'react-router-dom'

function Horozontalcards({data, func}) {
  // console.log(data)
  return (
    <div className='w-full h-[66vh] mb-6 px-5'>

        <div className='w-[100%] h-[55vh] flex overflow-y-hidden'>
            {data.length > 0 ? data.map((d, i) => (<Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[30vh] w-[15%] h-[98%] mr-5 bg-zinc-900'>
                <img className='w-full h-[50%] object-cover' src={d.backdrop_path || d.poster_path || d.backdrop_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path || d.backdrop_path}` : noimage} alt="" />
              <div className='text-white p-3 h-[45%]'>
                <h1 className='text-xl font-bold'>{d.original_title || d.name || d.title || d.original_name}</h1>
                 {d.episode_count ? (<p className='text-sm py-2'>Episodes: {d.episode_count}</p>) : null}
                <p className='text-sm pb-2'>{d.overview ? `${d.overview.slice(0,120)}...` : 'No overview available'}</p>
              </div>
            </Link>)) : <h1 className='mb-8 mt-3 text-xl font-black text-zinc-300'>Sorry!! Nothing to show</h1>}

        </div>


    </div>
  )
}

export default Horozontalcards