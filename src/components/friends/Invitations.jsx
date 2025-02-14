import { useFriends } from "../../hooks/useFriends"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const Invitations = () => {
  const {token} = useAuth()
  const {receivedRequests, sentRequests, acceptRequest, refuseRequest, cancelRequest, setRequests} = useFriends()

  const navigate = useNavigate()

  const acceptHandler = async (invitation) => {
    const accepted = await usersService.acceptInvitation(invitation.id, token)
    if(accepted) {
      acceptRequest(accepted)
    }
  }

  const refuseHandler = async (invitation) => {
    const user = await usersService.refuseInvitation(invitation.id, token)
    if(user) {
      refuseRequest(user)
    }
  }

  const cancelHandler = async (invitation) => {
    const canceled = await usersService.cancelInvitation(invitation.id, token)
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
    const receivedResponse = await usersService.fetchPaginedInvitations("received", token)
    const sentResponse = await usersService.fetchPaginedInvitations("sent", token)
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
    <div className="text-xl font-bold">
      <div className="w-full text-xl font-bold">
        <select onChange={changeSelectHandler} defaultValue={"requests"}>
          <option value="suggestions">Suggestions</option>
          <option value="requests">Friend Request</option>
        </select>
      </div>
    </div>
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