import { useEffect, useState } from "react"
import { DiscussionContextProvider } from "../hooks/useDiscussions"
import Discussion from "./discussions/Discussion"
import RightDiscussions from "./discussions/RightDiscussions"
import { useFriends } from "../hooks/useFriends"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import usersService from "../services/usersService"
import { useAuth } from "../hooks/useAuth"

const Discussions = () => {

  return <div className="w-full h-full flex">
    <div className="w-3/4 bg-gray-50">
      <Discussion />
    </div>
    <div id="discussions" className="w-1/4 py-4 pr-8 pl-4">
      <RightDiscussions />
    </div>
  </div>
}

export default Discussions