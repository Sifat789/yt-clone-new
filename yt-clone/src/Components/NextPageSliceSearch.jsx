import { createSlice } from "@reduxjs/toolkit";

const nextpagesearch = createSlice({
    name: 'nextpagesearch',
    initialState: '',
    reducers:{
        setnextpagesearch: (state, action) => {
            return action.payload
        }
    }
})

export const { setnextpagesearch } = nextpagesearch.actions

export default nextpagesearch.reducer;