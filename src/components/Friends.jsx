import { Outlet } from "react-router-dom"
import FriendsList from "./friends/FriendsList"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Friends = () => {
  const [loading, setLoading] = useState(false)

  return <div className="w-full h-full flex">
    {loading
      ? <div className="w-screen z-10 h-screen absolute flex justify-center items-center inset-0 bg-gray-50 opacity-80">
          <FontAwesomeIcon
            className="text-4xl animate-spin"
            icon="fa-solid fa-spinner"
          />
        </div> 
      : <></>
    }
    <div className="w-3/4 h-screen overflow-scroll px-8 py-4 bg-gray-50">
      <Outlet />
    </div>
    <div className="w-1/4 pr-8 pl-4 py-4">
      <FriendsList />
    </div>
  </div>
}

export default Friends