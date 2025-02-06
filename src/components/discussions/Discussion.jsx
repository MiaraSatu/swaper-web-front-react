import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useDiscussions from "../../hooks/useDiscussions"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import { useEffect, useState } from "react"
import { messagesService } from "../../services/messagesService"
import { useAuth } from "../../hooks/useAuth"
import { format } from "date-fns"

const Discussion = () => {
  const {token} = useAuth()
  const {chatList, currentDiscussion, setChatList, newMessage} = useDiscussions()
  const [message, setMessage] = useState("")

  const changeMessageHandler = (e) => {
    setMessage(e.target.value)
  }

  const submitMessageHandler = async (e) => {
    e.preventDefault()
    if(currentDiscussion) {
      const messageResponse = await messagesService.sendMessage({content: message}, "sample", currentDiscussion.id, token)
      if(messageResponse) {
        newMessage(messageResponse)
        setMessage("")
      }
    }
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
      {chatList.map(message => <MessageItem key={message.id} message={message} />)}
    </div>
    <div className="w-full px-8 py-4 bg-gray-200">
      <form
        onSubmit={submitMessageHandler}
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

const MessageItem = ({message}) => {
  const {user} = useAuth()
  const isMine = (message.sender.id == user.id)
  const isLong = (message.content.length > 70)
  const sentAt = Date.parse(message.createdAt)

  return <div className="w-full flex my-2">
    {!isMine 
      ? <img 
          src={message.sender.imageUrl ? apiImageUrl(message.sender.imageUrl) : avatar} 
          alt={message.sender.name} 
          className="w-12 h-12 mr-2"
        /> 
      : <></>
    }
    <div className={"message"+(isMine ? " mine" : " not-mine")+ (isLong ? " long": "")}>
      <div>{message.content}</div>
      <div className="text-xs text-end">
        {format(sentAt, "HH:mm")}
        <FontAwesomeIcon icon="fa-solid fa-check-double" className="ml-3" />
      </div>
    </div>
  </div>
}

export default Discussion