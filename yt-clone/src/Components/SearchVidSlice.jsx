import { createSlice } from "@reduxjs/toolkit";

const searchvid = createSlice({
    name: 'searchvid',
    initialState: [],
    reducers: {
        setVid: (state, action) => {
            return [...state, action.payload.map(item => ({
                title: item.snippet.title,
                img: item.snippet.thumbnails.high.url,
                channelName: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                id: item.id,
                description: item.snippet.description
            }))]
        },
        setVidFirst: (state, action) => {
            return [action.payload.map(item => ({
                title: item.snippet.title,
                img: item.snippet.thumbnails.high.url,
                channelName: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                id: item.id,
                description: item.snippet.description
            }))]
        }
    }
})


export const { setVid, setVidFirst } = searchvid.actions

export default searchvid.reducer