import React from 'react'
import { Link } from 'react-router-dom';

const SuggestVidTem = (props) => {

    const { video } = props

    const handledate = () => {
        const pastdate = video.publishedAt;
        const presentdate = new Date();
        const timedif = Math.round(presentdate - new Date(pastdate)) / 1000

        const timedifMins = Math.round(timedif / 60)
        if (timedifMins / (60 * 24) >= 365) {
            return `${Math.round(timedifMins / (60 * 24 * 365))} years ago`
        }
        else if (timedifMins / (60 * 24) >= 30) {
            return `${Math.round(timedifMins / (60 * 24 * 30))} months ago`
        }
        else if (timedifMins / 60 >= 24) {
            return `${Math.round(timedifMins / (60 * 24))} days ago`
        }
        else if (timedifMins >= 60) {
            return `${Math.round(timedifMins / 60)} hours ago`
        }
        else {
            return `${Math.round(timedifMins)} minutes ago`
        }
    }

    // const handleDescription = () => {
    //    const des = video.description
    //    if(des.length>30)
    //    {

    //    }
    // }

    return (
        <Link to={`/player/${video.id.videoId}`}>
            <div className='w-full container flex items-start  space-x-4 mt-4 justify-between'>
                <img className='h-28 rounded-lg' src={video.img} alt="" />
                <div className='overflow-hidden h-full w-3/4 '>
                    <h1 className='font-bold text-sm'>{video.title}</h1>

                    <h1 className='text-xs font-medium text-gray-700 '>{video.channelName}</h1>

                    <h1 className='text-sm font-medium text-gray-700'>{handledate()}</h1>



                    {/* <p className='mt-3 text-gray-700 font-medium font-sans text-sm' >{`${video.description.substring(0,100)}...`}</p> */}
                </div>
            </div>
        </Link>
    )
}

export default SuggestVidTem