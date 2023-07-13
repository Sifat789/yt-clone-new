import React from 'react'

const CommentTem = (props) => {

  const  comment  = props.comment

  const handledate = (publishedAt) => {
    const pastdate = publishedAt;
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

  const handlestats = (payload) => {
    if (payload > 999 && payload < 1000000)
      return `${(payload / 1000).toFixed(1)}K`
    else if (payload >= 1000000 && payload < 1000000000)
      return `${(payload / 1000000).toFixed(1)}M`
    else if (payload >= 1000000000)
      return `${(payload / 1000000000).toFixed(1)}B`
    else return `${payload}`
  }

  const commentText = comment.actualComment

  return (
    <div className='mt-3 flex space-x-4 items-center'>
      <span className='self-start  flex justify-center font-medium text-2xl rounded-full bg-yellow-500 '><img className='rounded-full' src={comment.profilePic? comment.profilePic : comment.authorName[0]} alt="" /></span>

      <div className='w-[93%]'>
        <p className='text-xs font-semibold text-gray-600'><span className='text-black font-semibold text-sm mr-2'>{comment.authorName}</span>   {handledate(comment.publishedAt)}</p>
        <div dangerouslySetInnerHTML={{ __html: commentText }}></div>

        <div className='mt-2'>
          <span className='flex items-center   rounded-full space-x-3'>
            <button className='flex justify-center items-center space-x-1 h-8 w-8 rounded-full hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>

            </button>
            <span className='text-xs relative right-3'>{comment.likes}</span>

            <button className=' flex justify-center items-center h-8 w-8 rounded-full hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg>

            </button>

            <button className='font-semibold text-sm ml-2 flex justify-center items-center h-7 w-[55px] rounded-full hover:bg-gray-200'>Reply</button>

          </span>
          <button className='flex h-8 min-w-[110px] items-center justify-around rounded-full hover:bg-gray-200'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

            <span className='text-sm font-semibold'>{comment.replies} replies</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentTem