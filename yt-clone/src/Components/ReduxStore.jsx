import { configureStore } from '@reduxjs/toolkit'
import HomeVidSlice from './HomeVidSlice'
import NextPageSlice from './NextPageSlice';
import SearchSlice from './SearchSlice';
import SearchVidSlice from './SearchVidSlice';
import NextPageSliceSearch from './NextPageSliceSearch';
import InputSlice from './InputSlice';

const store = configureStore({
    reducer:{
        HomeVid: HomeVidSlice,
        nextpage: NextPageSlice,
        searchslice: SearchSlice,
        searchvidslice: SearchVidSlice,
        nextpagesearch: NextPageSliceSearch,
        inputslice: InputSlice
    }
})

export default store;