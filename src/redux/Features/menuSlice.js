import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: "menu",
    initialState : {
        show : false
    },
   reducers : {
     showMenu : (state)=>{
        state.show = !state.show
    }
   }
})

export const {showMenu} = menuSlice.actions;
export default menuSlice.reducer




