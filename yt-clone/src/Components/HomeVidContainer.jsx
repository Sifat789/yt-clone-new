import React, { useCallback, useRef, useState } from 'react'
import HomeVidTem from './HomeVidTem'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setHomeVid } from './HomeVidSlice'
import { setnextpage } from './NextPageSlice'

const HomeVidContainer = (props) => {

    const nextPageToken = useSelector( state => state.nextpage)
    const dispatch = useDispatch()
    const loading = useRef(false)

    const { videos, islast } = props

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if(loading.current===true) return
            const getMoreVid = async () => {
                try {
                     loading.current=true //how is this line of code preventing double call of the api simultaneously?
                    const res = await axios({
                        method: 'GET',
                        url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=6&regionCode=bd&key=AIzaSyDrWy88a14NL3MJx1UIY_4KXAnu_DnWnng',
                        params: { pageToken: nextPageToken }
                    })
                    if(res.data.items.length<6)
                    {
                        alert("No more data is available")
                    }
                    dispatch(setHomeVid(res.data.items))
                    dispatch(setnextpage(res.data.nextPageToken))
                } catch(err){
                    console.log(err)
                }
            }
            getMoreVid()
        }
    })

    const getNewVideos = useCallback((node) => {
        if (node) {
            observer.disconnect()
            observer.observe(node)
        }
    })
    return (
        <div className='sm:grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-10 mb-12'>
            {
                videos.map((video, index) => {
                    if (islast && videos.length === index + 1) {
                        return <div key={video.id} ref={getNewVideos}><HomeVidTem video={video} /></div>
                    }
                    else return <HomeVidTem video={video} key={video.id} />
                })
            }
        </div>
    )
}

export default HomeVidContainer