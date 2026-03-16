import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "/src/redux/Features/menuSlice";
import searchReducer from "/src/redux/Features/searchSlice";
import videoReducer from "/src/redux/Features/videoSlice";
import categoryReducer from "/src/redux/Features/categorySlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    search : searchReducer,
    video : videoReducer,
    category : categoryReducer,
  },
});
