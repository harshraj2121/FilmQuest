import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from './utls/Axios';
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading'
import Cards from './partials/Cards';

function Movie() {

    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // Tracks if more data is available

    document.title = "Movie"

    const getMovie = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
          // console.log(data);
          // Append new data without duplication
          setmovie((prevState) => {
            const uniqueResults = data.results.filter(
              (newItem) => !prevState.some((existingItem) => existingItem.id === newItem.id)
            );
            return [...prevState, ...uniqueResults];
          });
    
          // Increment the page number for the next API call
          setPage(page + 1);
    
          // If fewer than expected results, stop further loading
          if (data.results.length === 0) {
            setHasMore(false); // No more data to load
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        // Reset page and movie data when category or duration changes
        setmovie([]);
        setPage(1);
        setHasMore(true); // Enable loading when category/duration changes
        getMovie();
      }, [category]);

  return movie.length > 0 ? (
    <div className="pt-[.55%] w-full">
      <nav className="px-[3%] w-full flex items-center justify-center">
        <span className="text-2xl text-zinc-400 flex items-center justify-between font-semibold">
          <i onClick={() => navigate('/')} className="hover:text-[#6556cd] mr-4 ri-arrow-go-back-line pt-1"></i>
          Movie <small className='text-sm ml-2 text-zinc-600'>({category})</small>
        </span>
        <div className="w-[80%]">
          <Topnav />
        </div>
        <div className="flex items-center justify-center gap-2">
          <DropDown title="movie" opt={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setcategory(e.target.value)} />
        </div>
      </nav>
      <InfiniteScroll
        next={getMovie}  // Load more data on scroll
        hasMore={hasMore}   // Whether there is more data to load
        dataLength={movie.length}  // Length of current loaded data
        loader={<h1 className='text-xl text-black absolute left-1/2 -translate-x-1/2 py-3 font-black'>Loading...</h1>} // Loading component while fetching more data
        endMessage={<p className='text-xl text-black absolute left-1/2 -translate-x-1/2 py-3 font-black'>No more content available</p>} // Message when no more data
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie