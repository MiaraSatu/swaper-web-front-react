import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../hooks/useAuth"
import { NavLink } from "react-router-dom"
import { BASE_URL } from "../services/api"
import avatar from "../assets/User_Avatar_2.png"

const LeftBar = () => {
  const {logout, user} = useAuth()

  return <div className="w-full h-full flex flex-col justify-between py-4 px-8 bg-gray-900">
    <div className="w-full text-3xl">
      <span className="text-indigo-600">We</span>
      <span className="text-gray-100">Chat</span>
    </div>
    <ul className="flex flex-col grow mt-8" id="left-bar-options">
      <li>
        <NavLink to={{pathname: "/"}}>
          <div className="icon">
            <FontAwesomeIcon icon="fa-solid fa-envelope" />
          </div>
          Messages
        </NavLink>
      </li>
      <li>
        <NavLink to={{pathname: "/friends/"}}>
          <div className="icon">
            <FontAwesomeIcon icon="fa-solid fa-user-plus" />
          </div>
          Friends
        </NavLink>
      </li>
      <li>
        <NavLink to={{pathname: "/groups/"}}>
          <div className="icon">
            <FontAwesomeIcon icon="fa-solid fa-users"/>
          </div>
          Groups
        </NavLink>
      </li>
      <li>
        <NavLink to={{pathname: "/favorites"}}>
          <div className="icon">
            <FontAwesomeIcon icon="fa-solid fa-heart" />
          </div>
          Favorites
        </NavLink>
      </li>
    </ul>
    <div className="w-full">
      <div className="flex">
        <div className="w-12 h-12 min-w-12">
          <img src={user.imageUrl ? user.imageUrl : avatar} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="px-2">
          <div className="text-white font-semibold">
            {user.name}
          </div>
          <div className="text-gray-500 text-sm">
            {user.email}
          </div>
        </div>
      </div>
      <button 
        className="text-red-600 flex items-center mt-4"
        onClick={() => {
          if(confirm("Are you sure to logout?"))
            logout()
        }}
      >
        <span className="mr-2">
          <FontAwesomeIcon icon="fa-solid fa-power-off" />
        </span>
        logout
      </button>
    </div>
  </div>
}

export default LeftBar