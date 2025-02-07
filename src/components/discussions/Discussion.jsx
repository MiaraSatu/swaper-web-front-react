import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useDiscussions from "../../hooks/useDiscussions"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import { useEffect, useRef, useState } from "react"
import { messagesService } from "../../services/messagesService"
import { useAuth } from "../../hooks/useAuth"
import { format, formatRelative } from "date-fns"

const Discussion = () => {
  const {token, user} = useAuth()
  const {chatList, currentDiscussion, setChatList, newMessage} = useDiscussions()
  const [message, setMessage] = useState("")
  const [parent, setParent] = useState(null) // parent of the new message in the form (reply to)
  const lastMessageRef = useRef(null)

  const changeMessageHandler = (e) => {
    setMessage(e.target.value)
  }

  const submitMessageHandler = async (e) => {
    e.preventDefault()
    if(currentDiscussion) {
      const messageResponse = await messagesService.sendMessage({content: message}, "sample", currentDiscussion.id, token, parent ? parent.id : null)
      if(messageResponse) {
        newMessage(messageResponse)
        setMessage("")
        setParent(null)
      }
    }
  }

  const replyToHandler = (newParent) => {
    setParent(newParent)
  }

  async function fetchMessages() {
    if(currentDiscussion) {
      const messagesResponse = await messagesService.fetchMessages(currentDiscussion.id, token)
      if(messagesResponse) setChatList(messagesResponse.data.reverse())
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [currentDiscussion])

  useEffect(() => {
    if(lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({behavior: "smooth", block: "start"})
    }
  }, [chatList])

  return <div className="flex flex-col w-full h-full">
    <div className="h-16 bg-gray-100 px-8 py-2 shadow">
      {currentDiscussion
        ? <div className="flex">
            <img 
              src={currentDiscussion.imageUrl ? apiImageUrl(currentDiscussion.imageUrl) : avatar} 
              alt={currentDiscussion.name}
              className="w-12 h-12 mr-2 object-cover"
            />
            <div className="text-gray-800 font-bold">{currentDiscussion.name}</div>
          </div>
        : <div>Select a discussion</div>
      }
    </div>
    <div className="px-8 py-4 grow bg-gray-200 overflow-scroll">
      {chatList.map(message => <MessageItem 
        key={message.id} 
        message={message} 
        replyToHandler={replyToHandler}
        lastReference={message.last ? lastMessageRef : null}
      />)}
    </div>
    <div className="relative w-full px-8 py-4 bg-gray-200">
      {parent   
      ? <div className="absolute bottom-full w-1/2 p-4 shadow-lg bg-white border border-gray-300 rounded opacity-55">
          <div className="flex items-center font-bold">
            <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" className="text-sm mr-2" />
            Reply to {parent.sender.id == user.id ? "you" : parent.sender.name}
            <button 
              className="w-5 h-5 flex items-center justify-center ml-auto rounded-full text-xs hover:bg-gray-300"
              onClick={() => setParent(null)}
            >
              <FontAwesomeIcon icon="fa-solid fa-x" />  
            </button>
          </div>
          <div className="w-full overflow-hidden text-ellipsis text-nowrap">{parent.content}</div>  
        </div>
      : <></>
      }
      <form
        onSubmit={submitMessageHandler}
        className=""
      >
        <div className="flex items-start bg-white px-4 py-2 rounded-lg shadow-md">
          <textarea 
            className="grow outline-none bg-transparent"
            placeholder="Type message..."
            onChange={changeMessageHandler}
            value={message}
          ></textarea>
          <button 
            className="text-lg text-gray-800"
            type="submit"
          >
            <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
          </button>
        </div>
      </form>
    </div>
  </div>
}

const MessageItem = ({message, replyToHandler, lastReference}) => {
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
    <div className="w-full flex">
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

export default Discussion