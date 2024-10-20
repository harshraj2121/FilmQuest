import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import axios from './utls/Axios';
import Cards from './partials/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

function Trending() {

  
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Tracks if more data is available
  document.title = 'Trending ' + category.toUpperCase()

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      
      // Append new data without duplication
      setTrending((prevState) => {
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
    // Reset page and trending data when category or duration changes
    setTrending([]);
    setPage(1);
    setHasMore(true); // Enable loading when category/duration changes
    getTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="pt-[.55%] w-full">
      <nav className="px-[3%] w-full flex items-center justify-center">
        <span className="text-2xl text-zinc-400 flex items-center justify-between font-semibold">
          <i onClick={() => navigate('/')} className="hover:text-[#6556cd] mr-4 ri-arrow-go-back-line pt-1"></i>
          Trending
        </span>
        <div className="w-[80%]">
          <Topnav />
        </div>
        <div className="flex items-center justify-center gap-2">
          <DropDown title="Trending" opt={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />
          <DropDown title="Duration" opt={["day", "week"]} func={(e) => setDuration(e.target.value)} />
        </div>
      </nav>
      <InfiniteScroll
        next={getTrending}  // Load more data on scroll
        hasMore={hasMore}   // Whether there is more data to load
        dataLength={trending.length}  // Length of current loaded data
        loader={<h1 className='text-xl text-black absolute left-1/2 -translate-x-1/2 py-3 font-black'>Loading...</h1>} // Loading component while fetching more data
        endMessage={<p>No more content available</p>} // Message when no more data
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;