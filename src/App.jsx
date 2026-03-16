import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Sidebar from "./Components/Sidebar"
import Category from "./Components/Category"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Category/>
      <div className="flex gap-3 px-3">
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default App