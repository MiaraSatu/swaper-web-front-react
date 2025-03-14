import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useDiscussions from "../../hooks/useDiscussions"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import MessagesService from "../../services/MessagesService"
import { useAuth } from "../../hooks/useAuth"
import useHome from "../../hooks/useHome"
import MessageItem from "./MessageItem"
import { Link, useParams } from "react-router-dom"
import AppService from "../../services/AppService"
import ApiService from "../../services/ApiService"

const Discussion = () => {
  const {discussion_id} = useParams()

  const {token, user} = useAuth()
  const {chatList, currentDiscussion, reactivityStatus, setChatList, addChatList, newMessage, setCurrentDiscussion} = useDiscussions()
  const {uncheckedMessageCount} = useHome()
  
  const [message, setMessage] = useState("")
  const [parent, setParent] = useState(null) // parent of the new message in the form (reply to)
  const [seeMoreUrl, setSeeMoreUrl] = useState(null)

  const lastMessageRef = useRef(null)
  const messageContainerRef = useRef(null)
  const topRef = useRef(null)
  const lastTopRef = useRef(null)

  const changeMessageHandler = (e) => {
    setMessage(e.target.value)
  }

  const submitMessageHandler = async (e) => {
    e.preventDefault()
    if(currentDiscussion && message != "") {
      const messageResponse = await MessagesService.sendMessage({content: message}, currentDiscussion.email ? "sample" : "inbox", currentDiscussion.id, token, parent ? parent.id : null)
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

  const seeMoreHandler = async () => {
    const response = await ApiService.fetch(seeMoreUrl, token)
    if(response) {
      if(response.data.length > 0) {
        addChatList(response.data.reverse())
        setSeeMoreUrl(response.seeMoreUrl)
      }
    }
  }

  async function fetchMessages() {
    if(currentDiscussion) {
      const messagesResponse = await MessagesService.fetchMessages(currentDiscussion.id, token, (currentDiscussion.email ? "sample" : "inbox"))
      if(messagesResponse) {
        setChatList(messagesResponse.data.reverse())
        setSeeMoreUrl(messagesResponse.seeMoreUrl)
      }
    }
  }

  useEffect(() => {
    async function fetchDiscussion(id) {
      let isBox = false
      if(id[0] == "b") {
        id = id.substring(1)
        isBox = true
      }
      const discussion = await MessagesService.fetchDiscussion(id, token, isBox)
      if(discussion != null) {setCurrentDiscussion(discussion)}
    }
    if(discussion_id) {
      fetchDiscussion(discussion_id)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [currentDiscussion])

  useEffect(() => {
    if(reactivityStatus == "lastMessage") {
      if(lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({behavior: "smooth", block: "start"})
      }
    }
  }, [chatList])

  useEffect(() => {
    if(uncheckedMessageCount != null && uncheckedMessageCount > 0) {
      fetchMessages()
    }
  }, [uncheckedMessageCount])

  useLayoutEffect(() =>{
    if(reactivityStatus == "lastTopMessage") {
      if(topRef.current && lastTopRef.current && messageContainerRef.current) {
        const lastTopPosition = lastTopRef.current.getBoundingClientRect().top
        const topPosition = topRef.current.getBoundingClientRect().top
        messageContainerRef.current.scrollTop += lastTopPosition - topPosition
      }
    }
  }, [chatList])

  return <div className="flex flex-col w-full h-full">
    <div className="h-16 bg-gray-100 px-8 py-2 shadow">
      {currentDiscussion
        ? <div className="flex">
            <img 
              src={AppService.loadImage(currentDiscussion.imageUrl)} 
              alt={currentDiscussion.name}
              className="w-12 h-12 rounded-full mr-2 object-cover"
            />
            <div className="text-gray-800 font-bold">{currentDiscussion.name}</div>
          </div>
        : <div>Select a discussion</div>
      }
    </div>
    <div className="px-8 py-4 grow bg-gray-200 overflow-scroll" ref={messageContainerRef}>
      <button 
        className="block mx-auto px-4 py-1 text-xs border border-gray-400 rounded-lg shadow hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400"
        onClick={seeMoreHandler}
        disabled={seeMoreUrl === null}
      >
        <FontAwesomeIcon icon="fa-solid fa-plus" className="mr-2" />
        See more
      </button>
      { currentDiscussion
        ? chatList.map((message, index) => <MessageItem 
            key={message.id} 
            message={message} 
            replyToHandler={replyToHandler}
            lastReference={message.last ? lastMessageRef : null}
            topReference={message.head ? topRef : null}
            lastTopReference={message.lastTop ? lastTopRef : null}
          />)
        : <div className="w-full h-full flex flex-col justify-center items-center">
            <Link to={"/discussion/new"}>
              <FontAwesomeIcon icon="fa-solid fa-users" className="block text-6xl" />
            </Link>
            Let you select a discussion to display here! 
          </div>
      }
    </div>
    <div className="relative w-full px-8 py-4 bg-gray-200">
      {parent   
      ? <div className="absolute bottom-full w-1/2 p-4 shadow-lg bg-white border border-gray-300 rounded opacity-85">
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

export default Discussion