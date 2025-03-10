import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../hooks/useAuth"
import AppService from "../../services/AppService"

const MessageStatus = ({message}) => {
  const {user} = useAuth()
  const status = AppService.getMessageStatus(message)

  return <>
    { (user.id == message.sender.id) 
      ? 
        <>{status == "sent"
            ? <FontAwesomeIcon icon="fa-solid fa-check" className="text-sm text-gray-600" />
            : <FontAwesomeIcon icon="fa-solid fa-check-double" className={(status == "ignored" ? "text-gray-300": "text-blue-700")} />
          }
        </>
      : <></>
    }
  </>
}

export default MessageStatus