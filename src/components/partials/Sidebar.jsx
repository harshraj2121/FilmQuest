import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


function Sidebar() {

  

  return (
    <div className='w-[20%] h-screen border-r-2 border-zinc-400 p-8'>
      <h1 className='text-2xl text-white font-bold'>
        <i className="mr-2 text-[#6556cd] ri-tv-fill"></i>
        <span className='text-2xl '>FilmQuest</span>
      </h1>
      <nav className='flex flex-col justify-center'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds</h1>
        <Link to='/trending' className='text-zinc-400 text-xl hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-3'>🔥 Trending</Link>
        <Link to='/popular' className='text-zinc-400 text-xl hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-3'>❤️ Popular</Link>
        <Link to='/movie' className='text-zinc-400 text-xl hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-3'>🎥 Movie</Link>
        <Link to='/tv_show' className='text-zinc-400 text-xl hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-3'>📺 TV Show</Link>
        <Link to='/people' className='text-zinc-400 text-xl hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-3'>🤵 People</Link>
      </nav>

    <hr className='my-6'/>

      <nav className='flex flex-col justify-center'>
        <h1 className='text-white font-semibold text-xl mb-5'>Website Info</h1>
        <Link className='text-zinc-400 text-xl hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-3'>📞 Contact Us</Link>
        <Link className='text-zinc-400 text-xl hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-3'>ℹ️ About Us</Link>
      </nav>
    </div>
  )
}

export default Sidebar