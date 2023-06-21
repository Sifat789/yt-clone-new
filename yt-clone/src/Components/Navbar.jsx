import React, { useEffect, useState } from 'react'
import { setSearch } from './SearchSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setVid, setVidFirst } from './SearchVidSlice'
import { setInput } from './InputSlice'




const Navbar = () => {

    const input = useSelector(state => state.inputslice)
    const dispatch = useDispatch()
    const [teminput, setteminput] = useState("")


    useEffect(() => {
        const handlesearch = async () => {
            try {
                const searchres = await axios({
                    method: 'GET',
                    url: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=AIzaSyAbD3lcpBbN2XpPiqhoNHvJ5mAMtNWZixE',
                    params: { q: input }
                })
                dispatch(setVidFirst(searchres.data.items))
                
            } catch (err) {
                console.log(err)
            }
        }

        handlesearch()
    }, [input])

    const handlerefresh = () => {
        window.location.reload()
    }
    return (
        <div className='w-full h-8 mt-2 flex justify-between fixed top-0'>


            <div className='h-full w-1/5 container flex items-center ml-6'>
                <button className='mr-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                </button>


                <button className='h-4/5 flex items-center' onClick={() => (dispatch(setSearch(false)), dispatch(setVidFirst([])), handlerefresh())} ><img className=' h-3/5 mr-1' src="./images/yt-logo.png" alt="logo" />
                <h3 className='font-bold text-xl mb-1'>YouTube</h3>
                </button>
                
            </div>

            {/* search section */}
            <div className='flex w-2/5 justify-between h-full'>
                <div className='flex border-solid border-black border-2 rounded-full px-3 py-4 items-center container justify-between'>
                    <input onChange={(e) => setteminput(e.target.value)} className='outline-none object-contain w-full bg-transparent' placeholder='Search' type="text" name="" id="" />
                    <button onClick={() => (dispatch(setInput(teminput)), dispatch(setSearch(true)))} className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>

                </div>
                <button className='rounded-full hover:bg-gray-300 px-1 ml-1  py-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>

                </button>
            </div>




            <div className='w-1/6 flex justify-evenly items-center'>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </button>

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button>

                <button>
                    <span className='rounded-full font-bold bg-blue-400 h-7 w-7 flex justify-center items-center'>S</span>
                </button>
            </div>
        </div>
    )
}

export default Navbar