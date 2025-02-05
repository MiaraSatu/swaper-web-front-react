import { useEffect, useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import SuggestionItem from "./SuggestionItem"
import InvitationModal from "./InvitationModal"
import InvitationItem from "./InvitationItem"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"

const Invitations = () => {
  const {token} = useAuth()
  const [filter, setFilter] = useState("received")
  const [currentReceiver, setCurrentReceiver] = useState(null)
  const {receivedRequests, sentRequests, refusedRequests, suggestionsList, setRequests, setSuggestionsList} = useFriends()

  const changeFilterHandler = (newFilter) => {
    setFilter(newFilter)
  }

  const openModal = (receiver) => {
    setCurrentReceiver(receiver)
  }

  const closeModal = () => {
    setCurrentReceiver(null)
  }

  useEffect(() => {
    const fetchRequests = async () => {
      const receivedResponse = await usersService.fetchPaginedInvitations("received", token)
      const sentResponse = await usersService.fetchPaginedInvitations("sent", token)
      const refusedResponse = await usersService.fetchPaginedInvitations("refused", token)
      const suggestionsResponse = await usersService.fetchPaginedSuggestions(token)
      if(receivedResponse)
        setRequests("received", receivedResponse.data, true)
      if(sentResponse)
        setRequests("sent", sentResponse.data, true)
      if(refusedResponse)
        setRequests("refused", refusedResponse.data, true)
      if(suggestionsResponse) 
        setSuggestionsList(suggestionsResponse.data, true)

      console.log(suggestionsList)
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
      <div className="w-full text-xl font-bold">Suggestions</div>
      <div className="w-full flex flex-wrap">
        {suggestionsList.map(user => <SuggestionItem key={user.id} user={user} sendInvitation={openModal} />)}
      </div>
    </div>
    <div className="text-xl font-bold">Friends Request</div>
      <ul className="flex cursor-pointer mt-3" id="friends-list-filter">
        <li 
          className={"mr-4 px-3 py-1 "+(filter == "received" ? "active" : "")}
          onClick={() => changeFilterHandler("received")}
        >
          Received
        </li>
        <li 
          className={"mr-4 px-3 py-1 "+(filter == "sent" ? "active" : "")}
          onClick={() => changeFilterHandler("sent")}
        >
          Sent
        </li>
        <li 
          className={"mr-4 px-3 py-1 "+(filter == "refused" ? "active" : "")}
          onClick={() => changeFilterHandler("refused")}
        >
          Refused
        </li>
      </ul>
      <div className="flex flex-wrap mt-3">
        {("received" == filter)
          ? <ReceivedLists receivedRequests={receivedRequests} />
          : <></>
        }
        {("sent" == filter)
          ? sentRequests.map(req => <InvitationItem 
              key={req.id}
              invitation={req}
            />)
          : <></>
        }
        {
          ("refused" == filter)
          ? refusedRequests.map(req => <InvitationItem 
              key={req.id}
              invitation={req}
            />)
          : <></>
        }
      </div>
  </div>
}

const RefuseModal = ({request, onClose}) => {
  const {token} = useAuth()
  const [message, setMessage] = useState()

  const submitHandler = async (e) => {
    e.preventDefault()
    const refused = await usersService.refuseInvitation(request.id, message, token)
  }

  return <div 
    className="w-screen h-screen absolute inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80"
    onClick={onClose}
  >
    <div className="bg-gray-50 p-8 rounded-md shadow-lg" onClick={(e) => e.stopPropagation()}>
      <div>Refuse invitation:</div>
      <div className="flex">
        <div className="w-16 h-16 min-w-16 mr-4">
          <img 
            src={request.sender.imageUrl ? apiImageUrl(request.sender.imageUrl) : avatar} 
            alt={request.sender.name} 
            className="object-cover" 
          />
        </div>
        <div>
          <div className="font-bold">{request.sender.name}</div>
          <div className="text-sm text-gray-600">{request.sender.email}</div>
        </div>
      </div>
      <div className="text-lg font-semibold">
        {request.refusalText}
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="f-message">Refusal message</label>
        <textarea 
          name="message" 
          id="f-message" 
          className="border border-gray-500 p-2 w-full outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Refuse</button>
      </form>
    </div>
  </div>
}

const ReceivedLists = ({receivedRequests}) => {
  const [currentRequest, setCurrentRequest] = useState(null)

  const showRefuseModal = (request) => {
    setCurrentRequest(request) 
  }
  const closeModalHandler = () => {
    setCurrentRequest(null)
  }

  return <>
    {currentRequest ? <RefuseModal request={currentRequest} onClose={closeModalHandler} /> : <></>}
    {receivedRequests.map(req => <InvitationItem 
      key={req.id}
      invitation={req}
      onRefuse={showRefuseModal}
      subjectStatus="sender"
    />)}
  </>
}

export default Invitations