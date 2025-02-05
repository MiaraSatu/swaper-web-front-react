import { useEffect, useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import SuggestionItem from "./SuggestionItem"
import InvitationModal from "./InvitationModal"
import InvitationItem from "./InvitationItem"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import Suggestions from "./Suggestions"
import { NavLink, Outlet, useParams } from "react-router-dom"
import Received from "./Received"
import Sent from "./Sent"

const Invitations = () => {
  const {token} = useAuth()
  const {setRequests, setSuggestionsList} = useFriends()

  const [currentReceiver, setCurrentReceiver] = useState(null)

  const openModal = (receiver) => {
    console.log("open modal", receiver)
    setCurrentReceiver(receiver)
  }

  const closeModal = () => {
    setCurrentReceiver(null)
  }

  useEffect(() => {
    const fetchRequests = async () => {
      const receivedResponse = await usersService.fetchPaginedInvitations("received", token)
      const sentResponse = await usersService.fetchPaginedInvitations("sent", token)
      const suggestionsResponse = await usersService.fetchPaginedSuggestions(token)
      if(receivedResponse)
        setRequests("received", receivedResponse.data, true)
      if(sentResponse)
        setRequests("sent", sentResponse.data, true)
      if(suggestionsResponse) 
        setSuggestionsList(suggestionsResponse.data, true)
    }
    fetchRequests()
  }, [])

  return <div className="w-full">
    {
      (currentReceiver)
      ? <InvitationModal receiver={currentReceiver} onClose={closeModal} />
      : <></>
    }
    <div className="w-full">
      <Suggestions openModal={openModal} />
    </div>
    <div className="text-xl font-bold">Friends Request</div>
      <ul className="flex cursor-pointer mt-3" id="friends-list-filter">
        <NavLink 
          to={{pathname:"/friends/received"}}
          className="mr-4 px-3 py-1"
        >
          Received
        </NavLink>
        <NavLink 
          to={{pathname: "/friends/sent"}}
          className="mr-4 px-3 py-1 "
          >
            Sent
        </NavLink>
      </ul>
      <div className="flex flex-wrap mt-3">
        <Outlet context={{openModal}} />
      </div>
  </div>
}

export default Invitations