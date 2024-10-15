import React, { useEffect, useState } from 'react'
import Sidebar from './partials/Sidebar'
import Topnav from './partials/Topnav'
import axios from './utls/Axios'
import Header from './partials/Header'
import Horozontalcards from './partials/Horozontalcards'
import DropDown from './partials/DropDown'
import Loading from './Loading'

function Home() {

  document.title = 'Homepage'

  const [wallpaper, setwallpaper] = useState(null)
  const [trending, setTrending] = useState(null)
  const [category, setcategory] = useState("all")

  const getHeaderWallpaper =  async () => {
    try {
      const {data} = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata)
    } catch (error) {
      console.log(error)
    }
  }

  const getTrending =  async () => {
    try {
      const {data} = await axios.get(`/trending/${category}/day`);
      setTrending(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTrending();
    !wallpaper &&  getHeaderWallpaper();
  }, [category]);


  

  return wallpaper && trending ?  (
    <div className='flex'>
      <Sidebar />
      <div className='w-[80%] h-screen overflow-auto overflow-x-hidden'>
        <Topnav />
        <Header data={wallpaper}/>

        <div className='p-6 flex justify-between'>
         <h1 className='text-3xl text-zinc-400 font-semibold'>Trending</h1>
         <DropDown title="Filter" opt ={["tv", "movie", "all"]} func={(e) => setcategory(e.target.value)}/>
       </div>

        <Horozontalcards data={trending} />
      </div>
    </div>
  ) : <Loading />
}

export default Home