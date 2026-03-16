import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
    name : "video",
    initialState : {
        video : ''
    },
    reducers : {
        storeVideo : (state,action)=>{
           state.video = action.payload
        }
    }
})

export const {storeVideo} = videoSlice.actions;
export default videoSlice.reducer
