import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Trailer() {

  alert("Trailer is not working due to API failure");
  const navigate = useNavigate();

  const {pathname} = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);
  console.log(ytVideo)

  return (
    <div className='z-50 absolute top-0 left-0 h-screen w-full bg-[rgba(0,0,0,.8)] flex items-center justify-center'>
      <div className='max-w-screen-xl relative'>
        <Link onClick={()=> navigate(-1)}><i className="ri-close-fill text-zinc-400 font-semibold absolute right-[-30%] top-[-30%] text-3xl hover:text-[#6556cd]"></i></Link>
        <ReactPlayer controls url={`https://youtu.be/dGoiFD0ZmsQ?si=Cziibs_Bc_XsnVsK`}/>
      </div>
    </div>
  )
}

export default Trailer