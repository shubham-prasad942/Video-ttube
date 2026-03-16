import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Video from "../Components/Video";
import Search from "../Components/Search";
import CategoryPage from "../Components/CategoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index:true, path:"home" ,element: <CategoryPage /> },
      { path: "gaming", element: <CategoryPage /> },
      { path: "automobiles", element: <CategoryPage /> },
      { path: "sports", element: <CategoryPage /> },
      { path: "music", element: <CategoryPage /> },
      { path: "news", element: <CategoryPage /> },
      { path: "video/:id", element: <Video /> },
      {path: "search",element : <Search/>}
    ],
  },
]);
