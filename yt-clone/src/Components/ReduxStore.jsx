import { configureStore } from '@reduxjs/toolkit'
import HomeVidSlice from './HomeVidSlice'
import NextPageSlice from './NextPageSlice';

const store = configureStore({
    reducer:{
        HomeVid: HomeVidSlice,
        nextpage: NextPageSlice
    }
})

export default store;