import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import useSearch from "../../hooks/useSearch"
import { useNavigate } from "react-router-dom"
import InvitationModal from "./InvitationModal"
import ReceivedInvitationModal from "./ReceivedInvitationModal"
import { appService } from "../../services/appService"

const Search = () => {
  const navigate = useNavigate()
  const {token} = useAuth()
  const [keyword, setKeyword] = useState("")
  const {results, setResults} = useSearch()
  const [currentReceiver, setCurrentReceiver] = useState(null)
  const [currentSender, setCurrentSender] = useState(null)

  const changeKeywordHandler = async (e) => {
    setKeyword(e.target.value)
    if(e.target.value == "") {
      setResults(null)
      return ;
    }
    const response = await usersService.search(e.target.value, token)
    if(response) {
      setResults(response)
    } else {
      console.log("response",response)
    }
  }

  return <div className="">
    {currentReceiver ? <InvitationModal receiver={currentReceiver} onClose={() => setCurrentReceiver(null)} /> : <></> }
    {currentSender ? <ReceivedInvitationModal sender={currentSender} onClose={() => setCurrentSender(null)} /> : <></>}
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex px-4 py-2 bg-gray-200 rounded-lg shadow-lg">
        <button className="text-2xl" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </button>
        <input 
          type="text" 
          onChange={changeKeywordHandler} 
          value={keyword} 
          placeholder="Search a user by name"
          className="grow outline-none mx-2 bg-transparent"
        />
        <button type="submit" className="text-2xl">
          <FontAwesomeIcon icon="fa-solid fa-search" />
        </button>
      </div>
    </form>
    {results 
      ? <div>
          {results.map(user => <div key={user.id} className="flex p-4 mt-3 rounded-md shadow bg-white">
            <img 
              className="w-16 h-16 rounded-full object-cover mr-2"
              src={appService.loadImage(user.imageUrl)} 
              alt={user.name} 
            />
            <div>
              <div className="text-lg font-semibold">{user.name}</div>
              <div className="text-gray-600">{user.email}</div>
            </div>
            <div className="ml-auto">
              <ResultOptions user={user} onOpenSendRequestModal={(u) => setCurrentReceiver(u)} onOpenReceivedRequestModal={(u) => setCurrentSender(u) } />
            </div>
          </div>)}
        </div>
      :<></>
    }
  </div>
}

const ResultOptions = ({user, onOpenSendRequestModal, onOpenReceivedRequestModal}) => {
  const navigate = useNavigate()
  const {token} = useAuth()
  const {remove, cancel} = useSearch()

  const handleSend = async () => {
    onOpenSendRequestModal(user)
  }

  const handleRemove = async () => {
    if(confirm(`Are you sure to remove ${user.name} (${user.email}) from your friend list?`)) {
      const response = await usersService.removeFriend(user.id, token)
      if(response) remove(response);
    }
  }

  const handleChat = () => {
    navigate("/"+user.id)
  }

  const handleAccept = () => {
    onOpenReceivedRequestModal(user)
  }

  const handleRefuse = () => {
    onOpenReceivedRequestModal(user)
  }

  const handleCancel = async () => {
    const response = await usersService.cancelInvitation(user.id, token, true)
    if(response) cancel(response)
  }

  return <>
    {user.friendStatus == "friend"
      ? <div>
          <button className="w-32 px-2 py-1 rounded bg-gray-900 text-gray-50" onClick={handleRemove}>
            <FontAwesomeIcon icon="fa-solid fa-check" className="mr-2" />
            Friend
          </button>
          <button className="w-32 px-2 py-1 ml-2 rounded bg-gray-900 text-gray-50" onClick={handleChat}>
            <FontAwesomeIcon icon="fa-solid fa-envelope" className="mr-2" />
            Chat
          </button>
        </div>
      : <></>
    }
    {user.friendStatus == "received"
      ? <div>
          <button className="w-32 px-2 py-1 rounded bg-green-800 text-gray-50 border-2 border-green-800" onClick={handleAccept}>
            <FontAwesomeIcon icon="fa-solid fa-check" className="mr-2" />
            Accept
          </button>
          <button className="w-32 px-2 py-1 ml-2 rounded border-2 text-gray-50 bg-red-800 border-red-800" onClick={handleRefuse}>
            <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
            Refuse
          </button>
        </div>
      : <></>
    }
    {user.friendStatus == "sent"
      ? <div>
          <button className="w-32 px-2 py-1 ml-2 rounded border-2 border-red-800 text-red-800" onClick={handleCancel}>
            <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
            Cancel
          </button>
        </div>
      : <></>
    }
    {user.friendStatus == "none"
      ? <div>
          <button className="border-2 px-2 py-1 rounded border-blue-600 text-blue-600"
            onClick={handleSend}
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" className="mr-2" />
            Send request
          </button>
        </div>
      : <></>
    }
  </>
}

export default Search