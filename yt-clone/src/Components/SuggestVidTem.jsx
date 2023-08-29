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

    return (
        <Link to={video ? `/player/${video.id.videoId}` : '/player/123'}>
            <div className='w-full container flex flex-col sm:flex-row sm:items-start items-center  sm:space-x-4 space-y-5 sm:space-y-0 mt-7 sm:mt-4 justify-between'>
                <img className=' sm:h-28 rounded-lg' src={video ? video.img : `../images/yt-logo.png`} alt="s" />
                <div className='overflow-hidden h-full w-3/4 '>
                    <h1 className='font-bold text-lg  sm:text-sm'>{video ? video.title : 'Look I have a million dollar'}</h1>

                    <h1 className='text-base sm:text-xs font-medium text-gray-700 '>{video ? video.channelName : 'Sifat Shikder'}</h1>

                    <h1 className='text-sm font-medium text-gray-700'>{video ? handledate() : '4 hours ago'}</h1>



                    {/* <p className='mt-3 text-gray-700 font-medium font-sans text-sm' >{`${video.description.substring(0,100)}...`}</p> */}
                </div>
            </div>
        </Link>
    )
}

export default SuggestVidTem