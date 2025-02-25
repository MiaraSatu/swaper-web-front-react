import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import usersService from "../../services/usersService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFriends } from "../../hooks/useFriends"
import useSearch from "../../hooks/useSearch"
import { appService } from "../../services/appService"

const InvitationModal = ({receiver, onClose}) => {
  const [message, setMessage] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const {newInvitation} = useFriends()
  const {token} = useAuth()
  const {results, send} = useSearch()

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await usersService.inviteFriend(receiver.id, message, token)
    if(response) {
      if(results && results.length > 0) { // si c'est une recherche
        send(response.receiver)
        console.log(results)
      } else {
        newInvitation(response) // se c'est une liste simple
      }
      onClose()
    } else {
      setErrorMessage("Invitation not sent!")
    }
  }

  return <div 
    className="w-screen h-screen absolute inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80"
    onClick={onClose}
  >
    <div className="p-8 bg-gray-50 rounded-lg relative" onClick={(e) => e.stopPropagation() }>
      <button 
        className="absolute right-4 top-4 w-8 h-8 flex justify-center items-center rounded-full bg-gray-200"
        onClick={onClose}
      >
        <FontAwesomeIcon icon="fa-solid fa-close" className="text-red-600 text-xl" />
      </button>
      <div>
        Send invitation request to
      </div>
      <div className="flex">
        <div className="w-16 h-16 min-w-16 mr-4">
          <img src={appService.loadImage(receiver.imageUrl)} alt={receiver.name} className="object-cover" />
        </div>
        <div>
          <div className="font-bold">{receiver.name}</div>
          <div className="text-sm text-gray-600">{receiver.email}</div>
        </div>
      </div>
      {
        errorMessage
        ? <div className="text-center text-red-600 text-sm">
            <FontAwesomeIcon icon="fa-solid fa-warning" />
            {errorMessage}
          </div>
        : <></>
      }
      <form onSubmit={submitHandler} className="w-96">
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
    </div>
  </div>
}

export default InvitationModal