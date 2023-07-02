import React from 'react'
import { useDispatch } from 'react-redux'
import { setId } from './PlayerVidIdSlice'
import { Link } from 'react-router-dom'

const HomeVidTem = (props) => {
  const { video } = props
  
  const dispatch = useDispatch()
  dispatch(setId(video.id))

  const handleviews = () => {
    if (video.views > 999 && video.views < 1000000)
      return `${(video.views / 1000).toFixed(1)}K views`
    else if (video.views >= 1000000 && video.views < 1000000000)
      return `${(video.views / 1000000).toFixed(1)}M views`
    else if (video.views >= 1000000000)
      return `${(video.views / 1000000000).toFixed(1)}B views`
    else return `${video.views} views`
  }

  const handledate = () => {
    const pastdate = video.publishedAt;
    const presentdate = new Date();
    const timedif = Math.round(presentdate- new Date(pastdate))/1000

    const timedifMins = Math.round(timedif/60)
    if(timedifMins/(60*24) >=365)
    {
        return `${Math.round(timedifMins/(60*24*365))} years ago`
    }
    else if(timedifMins/(60*24)>=30)
    {
        return `${Math.round(timedifMins/(60*24*30))} months ago`
    }
    else if(timedifMins/60 >=24)
    {
        return `${Math.round(timedifMins/(60*24))} days ago`
    }
    else if(timedifMins>=60)
    {
        return `${Math.round(timedifMins/60)} hours ago`
    }
    else
    {
        return `${Math.round(timedifMins)} minutes ago`
    }
  }

  return (
    <Link to={`/player/${video.id}`}>
    <div>
      <img className='h-52 w-68 rounded-lg' src={video.img} alt="" />
      <div>
        <h1 className='font-semibold ml-6 mt-2'>{video.title}</h1>
        <h1 className='font-medium ml-6 text-gray-700 mt-1'>{video.channelName}</h1>
        <div className='flex ml-6 space-x-3'>
          <h1>{ handleviews() }</h1>
          <h1>{ handledate() }</h1>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default HomeVidTem