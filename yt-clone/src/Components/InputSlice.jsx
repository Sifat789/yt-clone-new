import { createSlice } from "@reduxjs/toolkit";

const inputslice = createSlice({
    name: 'inputslice',
    initialState: "",
    reducers:{
        setInput: (state, action) => {
            return action.payload
        }
    }
})

export const { setInput } = inputslice.actions

export default inputslice.reducer