import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatRelative } from "date-fns"
import avatar from "../../assets/User_Avatar_2.png"

const MessageItem = ({message, replyToHandler, lastReference, topReference}) => {
  const {user} = useAuth()

  const [now, setNow] = useState(new Date())

  const isMine = (message.sender.id == user.id)
  const isLong = (message.content.length > 70)
  const sentAt = Date.parse(message.createdAt)

  useEffect(() => {
    const dateUpdateInterval = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(dateUpdateInterval)
  }, [])

  return <div className="w-full my-2" ref={lastReference}>
    {!isMine && message.start
      ? <div className="ml-8 font-bold">{message.sender.name}</div>
      : <></>
    }
    <div className="w-full flex" ref={topReference}>
      {!isMine && message.start
        ? <img 
            src={message.sender.imageUrl ? apiImageUrl(message.sender.imageUrl) : avatar} 
            alt={message.sender.name} 
            className="w-6 h-6 object-cover mr-2"
          /> 
        : <div className="w-6 mr-2"></div>
      }
      {isMine 
        ? <div 
            className="w-8 h-8 my-auto ml-auto mr-2 p-3 flex justify-center items-center rounded-full text-gray-300 hover:text-gray-900 hover:bg-gray-300 hover:shadow"
            onClick={() => replyToHandler(message)}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" />
          </div>
        : <></>
      }
      <div className={"message"+(isMine ? " mine" : " not-mine")+ (isLong ? " long": "")}>
        <div>{message.content}</div>
        <div className="text-xs text-end mt-2">
          {formatRelative(sentAt, now)}
          <FontAwesomeIcon icon="fa-solid fa-check-double" className="ml-3" />
        </div>
      </div>
      { !isMine
        ? <div 
            className="w-8 h-8 my-auto mx-2 p-3 flex justify-center items-center rounded-full text-gray-300 hover:text-gray-900 hover:bg-gray-300 hover:shadow"
            onClick={() => replyToHandler(message)}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" />
          </div>
        : <></>
      }
    </div>
  </div>
}

export default MessageItem