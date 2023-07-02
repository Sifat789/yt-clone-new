import { createSlice } from "@reduxjs/toolkit";

const playerId = createSlice({
    name: 'playerId',
    initialState: "",
    reducers: {
        setId: (state, action) => {
            return action.payload
        }
    }
})

export const { setId } = playerId.actions

export default playerId.reducer