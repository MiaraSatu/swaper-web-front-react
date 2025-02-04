import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../hooks/useAuth"

function getInvitationType(invitation, observer) {
  if(invitation.sender.id == observer.id) {
    if(invitation.accepted == false && invitation.refused == false)
      return "sent"
    if(invitation.refused == true)
      return "refused"
    if(invitation.accepted == true)
      return "accepted"
  } else if(invitation.receiver.id == observer.id) {
    if(invitation.accepted == false && invitation.refused == false)
      return "received"
  }
  return null
}

const InvitationItem = ({invitation, subjectStatus = "receiver"}) => {
  const {user} = useAuth()
  const subject = (subjectStatus == "receiver") ? invitation.receiver : invitation.sender
  const type = getInvitationType(invitation, user) // received, sent, refused
  
  return <div className="w-96 p-4 mx-2 border border-gray-200 rounded-md shadow sm">
    <div className="flex">
      <div className="w-20 h-20 min-w-20 mr-4 rounded-lg">
        <img 
          className="w-full object-cover"
          src={subject.imageUrl ? apiImageUrl(subject.imageUrl) : avatar} 
          alt={subject.name}
        />
      </div>
      <div>
        <div className="text-lg font-bold">{subject.name}</div>
        <div className="text-gray-600">{subject.email}</div>
      </div>
    </div>
    <div>Request message:</div>
    <div className="overflow-hidden text-ellipsis text-nowrap text-gray-500">
      "{invitation.invitationText}"
    </div>
    {
      type == "received"
      ? <div className="flex justify-between mt-2">
          <button className="w-1/2 mr-2 py-1 rounded text-green-600 border-2 border-green-600">
            <FontAwesomeIcon icon="fa-solid fa-check" className="mr-2" />
            Accept
          </button>
          <button className="w-1/2 ml-2 py-1 rounded text-red-600 border-2 border-red-600 ">
            <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
            Refuse
          </button>
        </div>
      : <></>
    }
    {
      type == "sent"
      ? <div className="flex justify-between mt-2">
          <button className="w-full ml-2 py-1 rounded text-red-600 border-2 border-red-600 ">
            <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
            Cancel
          </button>
        </div>
      : <></>
    }
    
  </div>
}

export default InvitationItem