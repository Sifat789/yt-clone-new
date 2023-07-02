import React from 'react'
import SearchVidTem from './SearchVidTem'
import { useDispatch, useSelector } from 'react-redux'
import { setnextpagesearch } from './NextPageSliceSearch'
import { useRef, useState, useCallback } from 'react'
import axios from 'axios'
import { setVid } from './SearchVidSlice'


const SearchVidContainer = (props) => {

    const { videos, islast } = props
    const nextPageToken = useSelector( state => state.nextpagesearch)
    const input = useSelector(state => state.inputslice)
    const dispatch = useDispatch()
    const loading = useRef()

    const getNewVideos = useCallback((node) => {
        if (node) {
            observer.disconnect()
            observer.observe(node)
            console.log('node', node)
        }
    })

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if(loading.current===true) return
            const getMoreVid = async () => {
                try {
                     loading.current=true //how is this line of code preventing double call of the api simultaneously?
                    const res = await axios({
                        method: 'GET',
                        url: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=AIzaSyDrWy88a14NL3MJx1UIY_4KXAnu_DnWnng',
                        params: { pageToken: nextPageToken, q: input }
                    })
                    if(res.data.items.length<1)
                    {
                        alert("No more data is available")
                    }
                    dispatch(setVid(res.data.items))
                    dispatch(setnextpagesearch(res.data.nextPageToken))
                    loading.current=false
                } catch(err){
                    console.log(err)
                }
            }
            getMoreVid()
        }
    })

    return (
        <div className=''>
            {
                videos.map((video, index) => {
                    if (islast && videos.length === index + 1) {
                        return <div key={video.id} ref={getNewVideos} ><SearchVidTem video={video} /></div>
                    }
                    else return <SearchVidTem video={video} key={video.id} />
                })
            }
        </div>
    )
}

export default SearchVidContainer