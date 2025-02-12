import { Outlet } from "react-router-dom"
import { useFriends} from "../hooks/useFriends"
import FriendsList from "./friends/FriendsList"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import usersService from "../services/usersService"

const Friends = () => {
  const {user, token} = useAuth()
  const {setSuggestionsList, setRequests, setFriendsList} = useFriends()
  const [loading, setLoading] = useState(false)

  async function initializeFriendsData() {
    const fetchSuggestions = async () => {
      const suggestionsResponse = await usersService.fetchPaginedSuggestions(token)
      if(suggestionsResponse) 
        setSuggestionsList(suggestionsResponse.data, true)
    }

    const fetchRequests = async () => {
      const receivedResponse = await usersService.fetchPaginedInvitations("received", token)
      const sentResponse = await usersService.fetchPaginedInvitations("sent", token)
      if(receivedResponse)
        setRequests("received", receivedResponse.data, true)
      if(sentResponse)
        setRequests("sent", sentResponse.data, true)
    }

    const fetchFriends = async () => {
      const response = await usersService.fetchPaginedFriends(user.id, token)
      setFriendsList(response.data)
    }
    setLoading(true)
    await fetchSuggestions()
    await fetchRequests()
    await fetchFriends()
    setLoading(false)
  }

  useEffect(() => {
    initializeFriendsData()
  }, [])

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