import { createSlice } from "@reduxjs/toolkit";

const searchslice = createSlice({
    name: 'searchslice',
    initialState:false,
    reducers:{
        setSearch: (state, action) => {
            return action.payload
        }
    }
})

export const { setSearch } = searchslice.actions

export default searchslice.reducer