import { createSlice } from "@reduxjs/toolkit";

const HomeVidSlice = createSlice({
    name: 'HomevidSlice',
    initialState: [],
    reducers: {
        setHomeVid: (state, action) => {
            return [...state, action.payload.map(item => ({
                title: item.snippet.title,
                img: item.snippet.thumbnails.high.url,
                channelName: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                views: item.statistics.viewCount,
                id: item.id
            }))]
        },
        setHomeVidFirst: (state, action) => {
            return [action.payload.map(item => ({
                title: item.snippet.title,
                img: item.snippet.thumbnails.high.url,
                channelName: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                views: item.statistics.viewCount,
                id: item.id
            }))]
        }
    }
})

export const { setHomeVid, setHomeVidFirst } = HomeVidSlice.actions

export default HomeVidSlice.reducer;