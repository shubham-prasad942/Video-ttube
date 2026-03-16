import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomData } from "/src/API/api";
export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: "home",
    categoryId: "0",
    isLoading : false,
    data : {},
    isError : false,
  },
  reducers: {
    updateCategory: (state, actions) => {
      state.category = actions.payload.category;
      state.categoryId = actions.payload.categoryId;
    },
  },
  extraReducers: (builder)=>{
   builder.addCase(fetchCategories.fulfilled, (state,actions)=>{
     state.isLoading = false;
     const catId = actions.meta.arg
     state.data[catId] = actions.payload
   })
   builder.addCase(fetchCategories.pending, (state,actions)=>{
    state.isLoading = true;
   });
   builder.addCase(fetchCategories.rejected, (state)=>{
    state.isError = true
   })
  }
});

export const fetchCategories = createAsyncThunk("fetchCategories", async (catId) => {
  const categoryData = await getRandomData(catId);
  return categoryData;
});

export const { updateCategory } = categorySlice.actions;
export default categorySlice.reducer;
