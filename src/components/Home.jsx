import { Outlet } from "react-router-dom"
import LeftBar from "./LeftBar"
import { HomeContextProvider } from "../hooks/useHome"

const Home = () => {
  return <HomeContextProvider>
    <div className="w-full h-screen flex"> 
      <div className="w-1/6 h-full">
        <LeftBar />
      </div>
      <div className="w-5/6 h-full">
        <Outlet />
      </div>
    </div>
  </HomeContextProvider>
}

export default Home