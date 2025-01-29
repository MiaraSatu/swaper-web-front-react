import { useEffect, useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"

const Invitations = () => {
  const {token} = useAuth()
  const [filter, setFilter] = useState("received")
  const {receivedRequests, sentRequests, refusedRequests, suggestionsList, setRequests, setSuggestionsList} = useFriends()

  const changeFilterHandler = (newFilter) => {
    setFilter(newFilter)
  }

  const openModalHandler = () => {
    setModalVisible(true)
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
    <div className="w-full">
      <div className="w-full text-xl font-bold">Suggestions</div>
      <div className="w-full flex flex-wrap">
        {suggestionsList.map(user => <SuggestionItem key={user.id} user={user} />)}
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
      <div className="mt-3">
        {("received" == filter)
          ? receivedRequests.map(req => <div key={req.id}>{req.sender.name}</div>)
          : <></>
        }
        {("sent" == filter)
          ? sentRequests.map(req => <div key={req.id}>{req.receiver.name}</div>)
          : <></>
        }
        {
          ("refused" == filter)
          ? refusedRequests.map(req => <div key={req.id}>{req.receiver.name}</div>)
          : <></>
        }
      </div>
  </div>
}

const SuggestionItem = ({user}) => {
  const [isModalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  return <>
    {
      (isModalVisible)
      ? <div 
        className="w-screen h-screen absolute inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80"
        onClick={closeModal}
      >
          <div className="p-8 bg-gray-50 rounded-lg" onClick={(e) => e.stopPropagation() }>
            <div>
              Send invitation request to
            </div>
            <div className="flex">
              <div className="w-16 h-16 min-w-16 mr-4">
                <img src={user.imageUrl ? apiImageUrl(user.imageUrl) : avatar} alt={user.name} className="object-cover" />
              </div>
              <div>
                <div className="font-bold">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>
            <InvitationForm userId={user.id} />
          </div>
        </div>
      : <></>
    }
    <div className="w-64 p-3 bg-white shadow-sm mx-2 hover:shadow-md">
      <div className="w-full h-16 bg-gray-200 flex justify-center items-end relative">
        <div className="w-20 h-20 rounded-full border-4 border-white absolute top-1/2">
          <img src={user.imageUrl ? apiImageUrl(user.imageUrl) : avatar} alt={user.name} />
        </div>
      </div>
      <div className="mt-10 text-center">
        <div className="font-bold">
          {user.name}
        </div>
        <div className="text-sm text-gray-500">
          {user.email}
        </div>
        <button 
          onClick={() => openModal()}
          className="w-full px-3 py-1 mt-2 bg-gray-50 rounded-md text-gray-900 border-2 border-gray-900"
        >
          Invite as friends
        </button>
      </div>
    </div>
  </>
}

const InvitationForm = ({userId}) => {
  const [message, setMessage] = useState()
  const {token} = useAuth()

  const submitHandler = async (e) => {
    e.preventDefault()
    await usersService.inviteFriend(userId, message, token)
  }
  return <form onSubmit={submitHandler} className="w-96">
    <label htmlFor="f-message" className="block">Invitation message</label>
    <textarea 
      className="border border-gray-500 p-2 w-full outline-none"
      type="text" 
      name="message" 
      id="f-message" 
      value={message} 
      placeholder="My request message"
      onChange={(e) => setMessage(e.target.value)} 
    />
    <button className="text-gray-50 bg-blue-500 px-3 py-1 rounded-md">Send invitation</button>
  </form>
}

export default Invitations