import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import usersService from "../../services/usersService"
import { apiImageUrl } from "../../services/api"

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

export default RefuseModal