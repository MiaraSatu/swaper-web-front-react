import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useDiscussions from "../../hooks/useDiscussions"
import { useState } from "react"

const Discussion = () => {
  const {currentDiscussion} = useDiscussions()
  const [message, setMessage] = useState("")

  const changeMessageHandler = (e) => {
    setMessage(e.target.value)
  }

  const submitMessageHandler = (e) => {
    e.preventDefault()
    console.log(message)
  }

  return <div className="flex flex-col w-full h-full">
    <div className="h-16 bg-gray-100 px-8 py-4 shadow">
      {currentDiscussion
        ? <div>{currentDiscussion.name}</div> 
        : <div>Select a discussion</div>
      }
    </div>
    <div className="px-8 py-4 grow bg-gray-200 overflow-scroll text-3xl">

    </div>
    <div className="w-full px-8 py-4 bg-gray-200">
      <form
        onSubmit={submitMessageHandler}
      >
        <div className="flex items-start bg-gray-50 px-4 py-2 rounded-lg">
          <textarea 
            className="grow outline-none bg-transparent"
            placeholder="Type message..."
            onChange={changeMessageHandler}
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