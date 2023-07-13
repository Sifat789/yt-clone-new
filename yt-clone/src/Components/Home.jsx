import React, { useEffect, useState } from 'react'
import LeftSideBarHeavy from './LeftSideBarHeavy'
import axios from 'axios'
import HomeVidContainer from './HomeVidContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setHomeVid, setHomeVidFirst } from './HomeVidSlice'
import { setnextpage } from './NextPageSlice'
import SearchSlice from './SearchSlice'
import SearchVidSlice from './SearchVidSlice'
import SearchVidTem from './SearchVidTem'
import SearchVidContainer from './SearchVidContainer'

const Home = () => {

  const dispatch = useDispatch()
  const homevideos = useSelector(state => state.HomeVid)
  const isSearching = useSelector(state => state.searchslice)
  const searchVids = useSelector(state => state.searchvidslice)

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=6&regionCode=bd&key=AIzaSyDrWy88a14NL3MJx1UIY_4KXAnu_DnWnng'
        })

        dispatch(setHomeVidFirst(res.data.items))
        dispatch(setnextpage(res.data.nextPageToken))

      } catch (err) {
        console.log(err)
      }
    }
    getVideos()

  }, [])

  const [light, setlight] = useState(false)
  return (
    // main container of Home
    <div className='flex  mt-16 '>

      {/* left sidebar */}
      <div className='hidden sm:block fixed h-full overflow-y-scroll w-1/6'>
        <LeftSideBarHeavy />
      </div>








      


      {
        !isSearching ? (
          <div className=' h-full fixed sm:left-64 overflow-y-scroll'>

            {
              homevideos.map((videos, index) => {
                if (homevideos.length === index + 1) {
                  return <HomeVidContainer key={videos[0].id} islast={true} videos={videos} />
                }
                else return <HomeVidContainer key={videos[1].id} islast={false} videos={videos} />
              })
            }

          </div>
        ) :
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        (
          <div className=' h-full w-[81.3%] fixed left-64 overflow-y-scroll'>
            {
              searchVids.map((videos, index) => {
                if (searchVids.length === index + 1) {
                  return <SearchVidContainer key={videos[0].id} islast={true} videos={videos} />
                }
                else return <SearchVidContainer key={videos[1].id} islast={false} videos={videos} />
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Home