import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie, removemovie } from '../store/actions/MovieActions';
import Loading from './Loading'

function MovieDetails() {

  const navigate = useNavigate();
  const {info} = useSelector(state => state.movie)
  console.log(info)

  const {id} = useParams()
  const diapatch = useDispatch();
  useEffect(()=> {
    diapatch(asyncloadmovie(id));
    return ()=> {
      diapatch(removemovie())
    }
  }, [])

  return info ? (
    <div style={{
      background : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      backgroundPosition: 'top 10%',
      backgroundSize: 'cover',
      }} className='w-screen h-screen px-[10%]'>
      {/* div for adjusting maximum width */}
      <div className='h-screen max-w-screen-xl mx-auto px-5'>
        {/* part 1 navigation */}
        <nav className='h-[10vh] w-full text-white flex items-center gap-[3%] text-xl'>
          <Link title='Back' onClick={() => navigate(-1)} className="hover:text-[#6556cd] mr-4 ri-arrow-go-back-line pt-1"></Link>
          <a title='Home' href="/"><i class="ri-home-line"></i></a>
          <a title='MoviePage' target='_blank' href={info.detail.homepage}><i className='ri-external-link-fill'></i></a>
          <a title='Wikidata' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className='ri-earth-fill'></i></a>
          <a title='IMDB' target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>IMDB</a>
        </nav>

        {/* part 2 poster and details */}

        <div className='w-full h-[56vh] flex flex-col items-start'>
          <div className='flex justify-start gap-[6%] w-full h-full'>
            <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[56vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} alt="" />
            <div className='h-full w-[67%] py-7'>
              {/* Name of the movie */}
              <h1 className='text-5xl text-white font-bold'>{info.detail.original_title || info.detail.original_name || info.detail.title || info.detail.name }<small className='text-base text-zinc-300'>({info.detail.release_date.split("-")[0]})</small></h1>
              {/* sub-details */}
              <div className='mt-2 mb-5 text-white text-lg flex items-center justify-start gap-3'>
                <span className='text-white bg-yellow-600 text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center'>
                    {(info.detail.vote_average*10).toFixed()} <sup>%</sup>
                </span>
                <h1 className='font-bold w-[60px] text-[3vh] leading-6'>User Score</h1>
                <h1>{info.detail.release_date}</h1>
                <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
                <h1>{info.detail.runtime}min</h1>
              </div>

              {/* plot summary */}
              <h1 className='font-semibold text-xl italic text-zinc-200'>{info.detail.tagline}</h1>

            </div>
          </div>



          {/* part 3 available on platforms */}
          <div className='mt-3 pl-0 p-3 w-[55%] text-white flex flex-col items-center justify-start gap-y-3 gap-2 object-fit'>
            <div className='flex items-center justify-around w-full'>
              <span className='w-[40%] font-semibold text-xl'>Buy</span>
              <div className='flex items-center justify-start gap-2 w-[60%]'>
                {info.watchproviders && info.watchproviders.buy ? (info.watchproviders.buy.map((w, index)=> <img title={w.provider_name} key={index} className='w-[5vh] rounded-md ' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=''/>)) : <span>Unavailable</span>}
              </div>
            </div>

            <div className='flex items-center justify-around w-full'>
              <span className='w-[40%] font-semibold text-xl'>Flatrate</span>
              <div className='flex items-center justify-start gap-2 w-[60%]'>
                {info.watchproviders && info.watchproviders.flatrate ? (info.watchproviders.flatrate.map((w, index)=> <img title={w.provider_name} key={index} className='w-[5vh] rounded-md ' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=''/>)) : <span>Unavailable</span>}
              </div>
            </div>

            <div className='flex items-center justify-around w-full'>
              <span className='w-[40%] font-semibold text-xl'>Rent</span>
              <div className='flex items-center justify-start gap-2 w-[60%]'>
                {info.watchproviders && info.watchproviders.rent ? (info.watchproviders.rent.map((w, index)=> <img title={w.provider_name} key={index} className='w-[5vh] rounded-md ' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=''/>)) : <span>Unavailable</span>}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MovieDetails