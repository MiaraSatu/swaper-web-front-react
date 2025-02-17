import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import useSearch from "../../hooks/useSearch"
import { useNavigate } from "react-router-dom"
import InvitationModal from "./InvitationModal"

const Search = () => {
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

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const handleAccept = async (sender) => {

  }

  const handleRefuse = async (sender) => {

  }

  return <div className="">
    {currentReceiver ? <InvitationModal receiver={currentReceiver} onClose={() => setCurrentReceiver(null)} /> : <></> }
    {currentSender ? <ReceivedInvitationModal sender={currentSender} onClose={() => setCurrentSender(null)} /> : <></>}
    <form onSubmit={submitHandler}>
      <div className="flex px-4 py-2 bg-gray-200 rounded-lg shadow-lg">
        <button className="text-2xl">
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
              src={user.imageUrl ? apiImageUrl(user.imageUrl) : avatar} 
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
  const [status, setStatus] = useState(user.friendStatus)

  const handleSend = async () => {
    onOpenSendRequestModal(user)
    setStatus("sent")
  }

  const handleRemove = async () => {
    if(confirm(`Are you sure to remove ${user.name} (${user.email}) from your friend list?`)) {
      const response = await usersService.removeFriend(user.id, token)
      if(response) {
        setStatus("none")
      }
    }
  }

  const handleChat = () => {
    navigate("/"+user.id)
  }

  const handleAccept = () => {
    onOpenReceivedRequestModal(user)
    setStatus("friend")
  }

  const handleRefuse = () => {
    onOpenReceivedRequestModal(user)
    setStatus("none")
  }

  const handleCancel = async () => {
    const response = await usersService.cancelInvitation(user.id, token, true)
    if(response) setStatus("none")
  }

  return <>
    {status == "friend"
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
    {status == "received"
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
    {status == "sent"
      ? <div>
          <button className="w-32 px-2 py-1 ml-2 rounded border-2 border-red-800 text-red-800" onClick={handleCancel}>
            <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
            Cancel
          </button>
        </div>
      : <></>
    }
    {status == "none"
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

const ReceivedInvitationModal = ({sender, onClose, onAccept, onRefuse}) => {
  const {token} = useAuth()
  const [request, setRequest] = useState(null)

  const handleAccept = async () => {
    const acceptedRequest = await usersService.acceptInvitation(request.id, token)
    if(acceptedRequest) onClose()
  }

  const handleRefuse = async () => {
    const refusedUser = await usersService.refuseInvitation(request.id, token)
    if(refusedUser) onClose()
  }

  async function fetchRequest() {
    const requestResponse = await usersService.getReceivedInvitation(sender.id, token)
    if(requestResponse) setRequest(requestResponse)
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  return <div 
      className="w-screen h-screen absolute inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      {request
        ? <div className="w-1/3 p-8 bg-gray-50 rounded-lg relative" onClick={(e) => e.stopPropagation() }>
            <button 
              className="absolute right-4 top-4 w-8 h-8 flex justify-center items-center rounded-full bg-gray-200"
              onClick={onClose}
              >
              <FontAwesomeIcon icon="fa-solid fa-close" className="text-red-600 text-xl" />
            </button>
            <div>
              Received invitation from
            </div>
            <div className="flex">
              <div className="w-16 h-16 min-w-16 mr-4">
                <img src={sender.imageUrl ? apiImageUrl(sender.imageUrl) : avatar} alt={sender.name} className="object-cover" />
              </div>
              <div>
                <div className="font-bold">{sender.name}</div>
                <div className="text-sm text-gray-600">{sender.email}</div>
              </div>
            </div>
            <div>
              {request.invitationText}
            </div>
            <div className="mt-4">
              <button className="w-32 px-2 py-1 rounded bg-green-800 text-gray-50 border-2 border-green-800" onClick={handleAccept}>
                <FontAwesomeIcon icon="fa-solid fa-check" className="mr-2" />
                Accept
              </button>
              <button className="w-32 px-2 py-1 ml-2 rounded border-2 text-gray-50 bg-red-800 border-red-800" onClick={handleRefuse}>
                <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
                Refuse
              </button>
            </div>
          </div>
        : <div>
            Request not found
          </div>
        }
    </div>
}

export default Search