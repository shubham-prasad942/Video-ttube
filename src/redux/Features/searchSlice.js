import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
    name : "search",
    initialState : {
      query : "",
      results : [],
    },
    reducers : {
        addQuery : (state,action)=>{
            state.query = action.payload
        },
        setResults : (state,action)=>{
           state.results = action.payload
        }
    }
})

export const {addQuery,setResults} = searchSlice.actions;
export default searchSlice.reducer