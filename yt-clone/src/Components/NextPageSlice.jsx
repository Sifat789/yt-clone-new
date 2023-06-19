import { createSlice } from "@reduxjs/toolkit";

const nextpage = createSlice({
    name: 'nextpage',
    initialState: '',
    reducers:{
        setnextpage: (state, action) => {
            return action.payload
        }
    }
})

export const { setnextpage } = nextpage.actions

export default nextpage.reducer;