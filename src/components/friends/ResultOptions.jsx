import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import useSearch from "../../hooks/useSearch"
import UsersService from "../../services/UsersService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ResultOptions = ({user, onOpenSendRequestModal, onOpenReceivedRequestModal}) => {
  const navigate = useNavigate()
  const {token} = useAuth()
  const {remove, cancel} = useSearch()

  const handleSend = async () => {
    onOpenSendRequestModal(user)
  }

  const handleRemove = async () => {
    if(confirm(`Are you sure to remove ${user.name} (${user.email}) from your friend list?`)) {
      const response = await UsersService.removeFriend(user.id, token)
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
    const response = await UsersService.cancelInvitation(user.id, token, true)
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

export default ResultOptions