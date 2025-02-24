import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatRelative } from "date-fns"
import avatar from "../../assets/User_Avatar_2.png"
import MessageStatus from "./MessageStatus"
import { appService } from "../../services/appService"

const MessageItem = ({message, replyToHandler, lastReference, topReference, lastTopReference}) => {
  const {user} = useAuth()

  const [now, setNow] = useState(new Date())

  const isMine = (message.sender.id == user.id)
  const isLong = (message.content.length > 70)
  const sentAt = Date.parse(message.createdAt)

  useEffect(() => {
    const dateUpdateInterval = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(dateUpdateInterval)
  }, [])

  return <>
    <div className="w-full my-2">
      {!isMine && message.start
        ? <div className="ml-8 font-bold">{message.sender.name}</div>
        : <></>
      }
      <div className="w-full flex">
        {topReference ? <div ref={topReference}></div> : <></>}
        {lastTopReference ? <div ref={lastTopReference}></div> : <></>}
        {lastReference ? <div ref={lastReference}></div> : <></>}
        {!isMine && message.start
          ? <img 
              src={message.sender.imageUrl ? apiImageUrl(message.sender.imageUrl) : avatar} 
              alt={message.sender.name} 
              className="w-6 h-6 object-cover mr-2 border"
            />
          : <div className="w-6 mr-2"></div>
        }
        <div className={`w-full flex ${!isMine ? "flex-row-reverse justify-end" : ""}`}>
          <div 
            className={`w-8 h-8 my-auto mx-2 p-3 flex justify-center items-center rounded-full text-gray-300 hover:text-gray-900 hover:bg-gray-300 hover:shadow ${isMine ? "ml-auto" : ""}`}
            onClick={() => replyToHandler(message)}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" />
          </div>
          <div className={isLong ? "w-3/4 ": ""}>
            { message.replyTo
              ? <div className="opacity-70">
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" className="mr-2" />
                    {message.replyTo.sender.id == user.id ? "you" : message.replyTo.sender.name}
                  </div>
                  <div className="w-full text-nowrap overflow-hidden text-ellipsis">{appService.sliceTextBasedOnMaster(message.replyTo.content, message.content)}</div>
                </div>
              : <></>
            }
            <div className={"p-4 rounded-2xl "+(isMine ? "bg-white " : "bg-gray-500 text-white ")}>
              <div>{message.content}</div>
              <div className="text-xs text-end mt-2">
                {formatRelative(sentAt, now)}
                <span className="mr-2"></span>
                <MessageStatus message={message} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </> 
}

export default MessageItem