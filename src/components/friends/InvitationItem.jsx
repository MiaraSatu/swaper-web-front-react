import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../hooks/useAuth"
import { useFriends } from "../../hooks/useFriends"
import usersService from "../../services/usersService"


const InvitationItem = ({invitation, onRefuse = () => {}, openModal = () => {},subjectStatus = "receiver"}) => {
  const {token} = useAuth()
  const {acceptRequest, cancelRequest, refuseRequest} = useFriends()
  const subject = (subjectStatus == "receiver") ? invitation.receiver : invitation.sender

  const acceptHandler = async () => {
    const accepted = await usersService.acceptInvitation(invitation.id, token)
    if(accepted) {
      acceptRequest(accepted)
    }
  }

  const cancelHandler = async () => {
    const canceled = await usersService.cancelInvitation(invitation.id, token)
    if(canceled) {
      cancelRequest(canceled)
    }
  }

  const refuseHandler = async () => {
    const user = await usersService.refuseInvitation(invitation.id, token)
    if(user) {
      refuseRequest(user)
    }
  }

  const inviteHandler = async (user) => {
    // const invitation = await usersService.inviteFriend(user.id, )
  }
  
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
      // you friend sent received none
      subject.friendStatus == "received"
      ? <div className="flex justify-between mt-2">
          <button 
            className="w-1/2 mr-2 py-1 rounded text-green-600 border-2 border-green-600"
            onClick={acceptHandler}
          >
            <FontAwesomeIcon icon="fa-solid fa-check" className="mr-2" />
            Accept
          </button>
          <button
            className="w-1/2 ml-2 py-1 rounded text-red-600 border-2 border-red-600 "
            onClick={() => onRefuse(invitation)}
          >
            <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
            Refuse
          </button>
        </div>
      : <></>
    }
    {
      subject.friendStatus == "sent"
      ? <div className="flex justify-between mt-2">
          <button 
            className="w-full ml-2 py-1 rounded text-red-600 border-2 border-red-600"
            onClick={cancelHandler}
          >
            <FontAwesomeIcon icon="fa-solid fa-x" className="mr-2" />
            Cancel
          </button>
        </div>
      : <></>
    }
    {
      subject.friendStatus == "friend"
      ? <div className="">
          <button className="">
            <FontAwesomeIcon icon="fa-solid fa-envelope" className="mr-2" />
            Message
          </button>
          <button className="">
            <FontAwesomeIcon icon="fa-solid fa-x" />
            Remove
          </button>
        </div>
      :<></>
    }
    {
      subject.friendStatus == "none"
      ? <div className="">
          <button 
            className=""
            onClick={() => {
              console.log("request sent from InvitationItem", subject)
              openModal(subject)
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" className="mr-2" />
            Send request
          </button>
        </div>
      : <></>
    }
    
  </div>
}

export default InvitationItem