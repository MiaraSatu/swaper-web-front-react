import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import useSearch from "../../hooks/useSearch"
import usersService from "../../services/usersService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { appService } from "../../services/appService"

const ReceivedInvitationModal = ({sender, onClose, onAccept, onRefuse}) => {
  const {token} = useAuth()
  const [request, setRequest] = useState(null)
  const {accept, refuse} = useSearch()

  const handleAccept = async () => {
    const acceptedRequest = await usersService.acceptInvitation(request.id, token)
    if(acceptedRequest) {
      accept(acceptedRequest.sender)
      onClose()
    }
  }

  const handleRefuse = async () => {
    const refusedUser = await usersService.refuseInvitation(request.id, token)
    if(refusedUser) {
      refuse(refusedUser)
      onClose()
    }
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
                <img src={appService.loadImage(sender.imageUrl)} alt={sender.name} className="object-cover" />
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
export default ReceivedInvitationModal