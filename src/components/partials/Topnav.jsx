import { Link } from 'react-router-dom';
import axios from '../utls/Axios';
import React, { useEffect, useState } from 'react'
import noimage from '/noImage.jpg'

function Topnav() {

    const [query, setquery] = useState("")
    const [searches, setsearches] = useState([])

    const GetSearches = async () => {
        try {
          const {data} = await axios.get(`/search/multi?query=${query}`);
          setsearches(data.results)
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        GetSearches()
      },[query]);

  return (
    <div className='w-[80%] z-50 h-[10vh] relative flex justify-start ml-[20%] items-center'>
        <i className="ri-search-line text-3xl text-zinc-400 "></i>
        <input onChange={(e)=> setquery(e.target.value)} value={query} spellCheck='false' className='w-[50%] mr-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-200' type="text" placeholder='search anything'/>
        <div className='absolute left-8 w-[60%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto'>
          {searches.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='shadow-xl text-zinc-700 font-semibold hover:text-black bg-zinc-200 duration-200 hover:bg-zinc-300 w-[100%] p-10 flex items-center justify-start border-b-2 border-zinc-100'>
              <img className='w-[10vh] h-[10vh] object-cover rounded mr-5' src={s.backdrop_path || s.profile_path || s.poster_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path || s.poster_path}` : noimage} alt="" />
              <span>{s.original_title || s.name || s.title || s.original_name}</span>
            </Link>
          ))}
        </div>
        {query.length > 0 ? (<i onClick={() => setquery("")} className="ri-close-line text3xl text-zinc-400 cursor-pointer"></i>) : null}   
    </div>
  )
}

export default Topnav