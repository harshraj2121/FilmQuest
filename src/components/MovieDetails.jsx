import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie, removemovie } from '../store/actions/MovieActions';
import Loading from './Loading'
import Horozontalcards from './partials/Horozontalcards'

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
  }, [id])

  return info ? (
    <div style={{
      background : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      }} className='h-[178vh] px-[10%] relative'>
      {/* div for adjusting maximum width */}
      <div className='h-screen max-w-screen-xl mx-auto px-5'>
        {/* part 1 navigation */}
        <nav className='h-[7vh] w-full text-white flex items-center gap-[3%] text-xl mb-5'>
          <Link title='Back' onClick={() => navigate(-1)} className="hover:text-[#6556cd] mr-4 ri-arrow-go-back-line pt-1"></Link>
          <a title='Home' href="/"><i className="ri-home-line"></i></a>
          <a title='MoviePage' target='_blank' href={info.detail.homepage}><i className='ri-external-link-fill'></i></a>
          <a title='Wikidata' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className='ri-earth-fill'></i></a>
          <a title='IMDB' target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>IMDB</a>
        </nav>

        {/* part 2 poster and details */}

        <div className='w-full h-[56vh] flex flex-col items-start'>
          <div className='flex justify-start gap-[6%] w-full h-full'>
            <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[65vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} alt="" />
            <div className='h-full w-[67%]'>
              {/* Name of the movie */}
              <h1 className='text-5xl text-white font-bold'>{info.detail.original_title || info.detail.original_name || info.detail.title || info.detail.name }<small className='text-base text-zinc-300'>({info.detail.release_date.split("-")[0]})</small></h1>
              {/* sub-details */}
              <div className='mt-1 mb-3 text-white text-lg flex items-center justify-start gap-3'>
                <span className='text-white bg-yellow-600 text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center'>
                    {(info.detail.vote_average*10).toFixed()} <sup>%</sup>
                </span>
                <h1 className='font-bold text-zinc-200 w-[60px] text-[3vh] leading-6'>User Score</h1>
                <h1>{info.detail.release_date}</h1>
                <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
                <h1>{info.detail.runtime}min</h1>
              </div>

              {/* plot summary */}
              <h1 className='font-semibold text-xl italic text-zinc-200'>{info.detail.tagline}</h1>
              <h1 className='font-semibold text-xl text-white mt-5'>Overview</h1>
              <p className='text-white my-2 '>{info.detail.overview}</p>

              <h1 className='font-semibold text-xl text-white mt-3'>Movie Translated</h1>
              <p className='text-white mt-2 mb-4 text-sm'>{info.translations.join(", ").slice(0,45)}</p>

              <Link to={`trailer`} className='text-white px-7 py-2 bg-[#6556cd] rounded-md font-semibold'>
                <i className="text-base ri-play-fill mr-3"></i>
                Play Trailer
              </Link>


            </div>
          </div>



          {/* part 3 available on platforms */}
          <div className='mt-[12vh] mb-8 pl-0 p-3 w-[55%] text-white flex flex-col items-center justify-start gap-y-3 gap-2 object-fit'>
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


          {/* Part 4 recomendations and similar stuffs */}
          <hr className='w-full'/>
          <h1 className='mb-8 mt-3 text-3xl font-bold text-zinc-300'>Recomendations & Similar Stuffs</h1>
          <Horozontalcards data={info.recommendations.length > 0 ? info.recommendations : info.similar}/>
        </div>
      </div>



      
      <Outlet/>
    </div>
  ) : <Loading />
}

export default MovieDetails