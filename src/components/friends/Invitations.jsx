import { useFriends } from "../../hooks/useFriends"
import UsersService from "../../services/UsersService"
import { useAuth } from "../../hooks/useAuth"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import InvitationNav from "./InvitationNav"

const Invitations = () => {
  const {token} = useAuth()
  const {receivedRequests, sentRequests, acceptRequest, refuseRequest, cancelRequest, setRequests} = useFriends()

  const navigate = useNavigate()

  const acceptHandler = async (invitation) => {
    const accepted = await UsersService.acceptInvitation(invitation.id, token)
    if(accepted) {
      acceptRequest(accepted)
    }
  }

  const refuseHandler = async (invitation) => {
    const user = await UsersService.refuseInvitation(invitation.id, token)
    if(user) {
      refuseRequest(user)
    }
  }

  const cancelHandler = async (invitation) => {
    const canceled = await UsersService.cancelInvitation(invitation.id, token)
    if(canceled) {
      cancelRequest(canceled)
    }
  }

  const changeSelectHandler = (e) => {
    if(e.target.value == "suggestions") {
      navigate("/friends/suggestions")
    }
  }

  const fetchRequests = async () => {
    console.log("Fetch lanced [Invitations]")
    const receivedResponse = await UsersService.fetchPaginedInvitations("received", token)
    const sentResponse = await UsersService.fetchPaginedInvitations("sent", token)
    if(receivedResponse)
      setRequests("received", receivedResponse.data, true)
    if(sentResponse)
      setRequests("sent", sentResponse.data, true)
  }

  useEffect(() => {
    if(receivedRequests.length != 0 || sentRequests.length != 0) return;
    fetchRequests()
  }, [])

  return <div className="w-full">
    <InvitationNav />
    <ul className="flex cursor-pointer mt-3" id="friends-list-filter">
      <NavLink 
        to={{pathname:"/friends/requests/received"}}
        className="mr-4 px-3 py-1"
      >
        Received
      </NavLink>
      <NavLink 
        to={{pathname: "/friends/requests/sent"}}
        className="mr-4 px-3 py-1 "
        >
          Sent
      </NavLink>
    </ul>
    <div className="flex flex-wrap mt-3">
      <Outlet context={{onAccept: acceptHandler, onRefuse: refuseHandler, onCancel: cancelHandler}} />
    </div>
  </div>
}

export default Invitations