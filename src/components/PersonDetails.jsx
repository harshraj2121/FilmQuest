import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import Loading from './Loading'
import Horozontalcards from './partials/Horozontalcards'

function PersonDetails() {

  const navigate = useNavigate();
  const {info} = useSelector(state => state.person)
  console.log(info)

  const [Category, setCategory] = useState("movie")

  const {id} = useParams()
  const diapatch = useDispatch();
  useEffect(()=> {
    diapatch(asyncloadperson(id));
    return ()=> {
      diapatch(removeperson())
    }
  }, [id])

  return info ? (
    <div className='px-[15%] h-fit pb-11 bg-[#1F1E24]'>
      <div className='max-w-screen-xl mx-auto flex flex-col'>
        {/* part 1 navigation */}
        <nav className='h-[7vh] w-full text-white flex items-center gap-[3%] text-xl mb-5'>
          <Link title='Back' onClick={() => navigate(-1)} className="hover:text-[#6556cd] mr-4 ri-arrow-go-back-line pt-1"></Link>  
        </nav>
        

        <div className='flex'>
          {/* left poster and details */}
          <div className='w-[20%]'>
            <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[90%] h-[35vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path || info.detail.backdrop_path}`} alt="" />
            <hr className='w-full mt-7 mb-3'/>

            {/* social media links */}

            <div className='text-xl text-white flex gap-x-5'>
              <a title='Wikidata' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className='ri-earth-fill'></i></a>
              <a title='facebook' target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}><i className='ri-facebook-circle-fill'></i></a>
              <a title='Instagram' target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}><i className='ri-instagram-fill'></i></a>
              <a title='Twitter-X' target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`}><i className='ri-twitter-fill'></i></a>
            </div>
            {/* person info */}
            <h1 className='text-2xl text-zinc-300 font-semibold my-3'>Person Info</h1>
            <h1 className='text-lg text-zinc-300 font-semibold'>Known for</h1>
            <h1 className='text-zinc-300'>{info.detail.known_for_department}</h1>

            <h1 className='text-lg text-zinc-300 font-semibold mt-2'>Gender</h1>
            <h1 className='text-zinc-300'>{info.detail.gender === 2 ? "Male" : "Female"}</h1>

            <h1 className='text-lg text-zinc-300 font-semibold mt-2'>Birthday</h1>
            <h1 className='text-zinc-300'>{info.detail.birthday}</h1>

            <h1 className='text-lg text-zinc-300 font-semibold mt-2'>Death day</h1>
            <h1 className='text-zinc-300'>{info.detail.deathday ? (info.detail.deathday) : "Fucking Alive"}</h1>

            <h1 className='text-lg text-zinc-300 font-semibold mt-2'>Place Of Birth</h1>
            <h1 className='text-zinc-300'>{info.detail.place_of_birth}</h1>

            <h1 className='text-lg text-zinc-300 font-semibold mt-2'>Also Known As</h1>
            <h1 className='text-zinc-300'>{info.detail.also_known_as.join(", `")}</h1>
          </div>


          {/* right details and information */}
          <div className='w-[80%] ml-[5%] overflow-auto'>
            <h1 className='text-6xl text-zinc-300 font-black my-3'>{info.detail.name}</h1>
            <h1 className='text-lg text-zinc-300 font-semibold'>Biography</h1>
            <p className='text-zinc-400 mt-3'>{info.detail.biography}</p>
            <h1 className='text-lg text-zinc-300 font-semibold mt-5'>Summary</h1>
            <Horozontalcards data={info.combinedCredits.cast}/>
            <div className='w-full flex justify-between'>
              <h1 className='mt-5 text-2xl text-zinc-200 font-semibold tracking-wider'>* Cinematic Journey</h1>
            </div>

            {/* Movies by the person and their roles*/}
            <div className='w-full shadow-md text-zinc-400 px-3 shadow-white mb-5 mt-5 h-[50vh] overflow-x-hidden overflow-y-auto border-zinc-500 border-2'>
              {info?.[Category + "Credits"]?.cast ? (info[Category + "Credits"].cast.map((c, i) =>
               <li key={i} className='hover:text-white hover:bg-zinc-900 cursor-pointer group py-3 w-full rounded duration-200'>
                 <Link to={`/${Category}/details/${id}`}>
                   <span className='group-hover:font-semibold'>{c.original_title || c.original_name || c.title || c.name }</span>
                   <span className='block ml-6'>{c.character && `Charater Name: ${c.character}`}</span>
                 </Link>
               </li>
              )) : <p className='text-center text-zinc-400 mt-10'>Has Yet to Make a Cinematic Appearance</p>}
              
              
            </div>
          </div>
        </div>



      </div>
    </div>
  ) : <Loading />
}

export default PersonDetails


