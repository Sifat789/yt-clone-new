import React, { useCallback, useEffect, useState } from 'react'
import CommentTem from './CommentTem'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import SuggestVidTem from './SuggestVidTem';

const Player = () => {

  const { id } = useParams()
  const [videoPlayer, setvideoPlayer] = useState('')
  const [suggest, setsuggest] = useState([])
  const [nextpage, setnextpage] = useState('')


  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&key=AIzaSyDtPQMIHufVhGSbo6qW30u4pT2QlU2_VY4',
          params: { id: id, maxHeight: 494, maxWidth: 881 }
        })
        setvideoPlayer(res.data.items[0].player.embedHtml)

      } catch (err) {
        console.log(err)
      }
    }
    // getInfo()
  }, [])

  useEffect(() => {
    const getSuggestvid = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&key=AIzaSyDtPQMIHufVhGSbo6qW30u4pT2QlU2_VY4 ',
          params: { relatedToVideoId: id }
        })
        console.log(res.data)
        setsuggest(...suggest, res.data.items.map(item => ({
          title: item.snippet.title,
          img: item.snippet.thumbnails.high.url,
          channelName: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          id: item.id,
          description: item.snippet.description
        })))
        setnextpage(res.data.nextPageToken)
      } catch (err) {
        console.log(err)
      }
    }
    getSuggestvid()
  }, [])

  // console.log(suggest)

  
  const observeSuggest = useCallback((node) => {
    if (node)
     { observer.disconnect()
      observer.observe(node)}
  })

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const getSuggestvid = async () => {
        try {
          const res = await axios({
            method: 'GET',
            url: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&key=AIzaSyDtPQMIHufVhGSbo6qW30u4pT2QlU2_VY4 ',
            params: { relatedToVideoId: id, pageToken: nextpage }
          })
          console.log(res.data)
          setsuggest(...suggest, res.data.items.map(item => ({
            title: item.snippet.title,
            img: item.snippet.thumbnails.high.url,
            channelName: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            id: item.id,
            description: item.snippet.description
          })))
         
          setnextpage(res.data.nextPageToken)
        } catch (err) {
          console.log(err)
        }
      }
      getSuggestvid()
    }
  })

  console.log('suggest',suggest)


  return (
    <div className='w-full h-full mt-16 overflow-y-scroll fixed border-solid border-2 border-blue-500'>
      <div className='absolute top-0 flex w-full border-solid border-2 border-red-500'>
        {/* video and comments section */}
        <div className='w-[66%] border-solid border-2 border-green-500 ml-4'>
          <video className='' src="../videos/video.mp4"></video>

          {/* <div dangerouslySetInnerHTML={{ __html: videoPlayer }} /> */}


          {/* channel name, profile pic,video title+ section */}
          <div className='mt-2'>
            <h1 className='text-lg font-bold'>Mastering the art of Job Interview - @Foyzul & @LearnwithSumit</h1>

            <div className='flex w-full justify-between'>
              <div className='flex w-[45%] justify-between items-center'>
                <span className='h-11 w-11 flex justify-center  text-3xl font-bold rounded-full bg-green-400'>s</span>
                <div className='relative top-1'>
                  <h1 className='text-lg font-semibold '>Learn with Sumit - LWS</h1>
                  <small className='relative bottom-2 text-gray-600 font-semibold'>100k subscribers</small>
                </div>
                <button className='bg-gray-300 rounded-full px-4 py-1 flex space-x-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                  <span className='font-semibold'>Subscribe</span></button>
              </div>

              <div className='flex items-center justify-between w-[45%] mr-7'>
                {/* like dislike button */}
                <span className='flex bg-gray-300 px-3 py-1 rounded-full space-x-2'>
                  <button className='flex space-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                    <span>100 |</span>
                  </button>

                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                    </svg>

                  </button>

                </span>


                {/* share button */}
                <button className='flex bg-gray-300 px-3 py-1 rounded-full space-x-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  <span className='font-semibold'>Share</span>
                </button>


                {/* download button */}
                <button className='flex bg-gray-300 px-3 py-1 rounded-full space-x-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>

                  <span className='font-semibold'>Download</span>
                </button>


                {/* ... button */}
                <button className='flex justify-center h-8 w-8 bg-gray-300 px-3 py-1 rounded-full space-x-2 items-center'>
                  <span className='font-bold relative bottom-1'>...</span>
                </button>
              </div>
            </div>
          </div>




          {/* discription section */}
          <div className='mt-6 bg-gray-200 rounded-xl py-2 px-1'>
            <h1>5.1K views  8 hours ago</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, vel! Doloremque obcaecati incidunt veritatis libero omnis dolore, harum quis iusto corrupti alias mollitia, magnam soluta debitis recusandae earum similique aut aperiam? Error alias est quibusdam optio aut recusandae obcaecati, asperiores minima distinctio nesciunt eaque nihil autem corrupti maiores officia sint? lorem500</p>
          </div>


          {/* comments count, sort by */}
          <div className='flex mt-4 space-x-8 items-center'>
            <span className='text-xl font-bold'>4 Comments</span>
            <span className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
              <span className='ml-2 font-semibold'>Sort by</span>
            </span>
          </div>


          {/* Add a comment */}
          <div className='mt-4 flex items-center space-x-4'>
            <span className='h-11 w-11 flex justify-center font-medium text-2xl rounded-full bg-blue-500'>s</span>
            <input placeholder='Add a comment...' className='border-solid w-[90%] border-b-2 border-black outline-none relative bottom-2' type="text" />
          </div>


          {/* actual comments card */}
          <div className='mt-10'>
            <CommentTem />
            <CommentTem />
            <CommentTem />
            <CommentTem />
            <CommentTem />
          </div>

          <p className='mt-40'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error vero nobis reprehenderit similique ut, odio provident eius, vel omnis voluptatum doloremque magni non adipisci unde! Error ducimus quos animi enim?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero corrupti totam deserunt perspiciatis molestias nulla aut iusto ipsa recusandae sapiente earum incidunt reprehenderit, numquam porro aliquam praesentium nam neque atque fugiat. Vitae laudantium sequi quia molestias optio quibusdam quaerat eius ipsam, omnis officiis veniam quidem earum similique, magni atque voluptatem consequatur, ratione quasi quis. Quos eos, assumenda aliquam repudiandae beatae illo! Adipisci quae consequatur esse at dolor velit neque quaerat! Totam sequi labore quo, voluptatum dolor nihil pariatur corporis similique, nulla eos quae. Delectus enim maxime alias praesentium eius fuga temporibus ipsum, error at ex vero aliquid facere neque. Autem?</p>
        </div>














        {/* suggested video section */}
        <div className='w-[30%] ml-6'>
          {
            suggest.map((video, index) => {
              if (suggest.length === index + 1) {
                return <div ref={observeSuggest}><SuggestVidTem id={video.id} video={video} /></div>
              }
              else return <SuggestVidTem id={video.id} video={video} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Player