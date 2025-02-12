import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../hooks/useAuth"
import { appService } from "../../services/appService"

const MessageStatus = ({message}) => {
  const {user} = useAuth()
  const status = appService.getMessageStatus(message)

  return <>
    { (user.id == message.sender.id) 
      ? 
        <>{status == "sent"
            ? <FontAwesomeIcon icon="fa-solid fa-check" className="text-sm text-gray-600" />
            : <FontAwesomeIcon icon="fa-solid fa-check-double" className={(status == "ignored" ? "text-gray-600": "text-blue-400")} />
          }
        </>
      : <></>
    }
  </>
}

export default MessageStatus