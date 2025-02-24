import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BestFriends from "./BestFriends"
import { useEffect, useState } from "react"
import { messagesService } from "../../services/messagesService"
import { useAuth } from "../../hooks/useAuth"
import useDiscussions from "../../hooks/useDiscussions"
import DiscussionItem from "./DiscussionItem"
import useHome from "../../hooks/useHome"
import { Link } from "react-router-dom"

const RightDiscussions = () => {
  const {token} = useAuth()
  const {discussionsList, setDiscussionsList} = useDiscussions()
  const {uncheckedMessageCount} = useHome()

  const searchSubmitHandler = async (e) => {
    e.preventDefault()
  }

  async function fetchData() {
    const discussionsResponse = await messagesService.fetchDiscussions(token)
    if(discussionsResponse) {
      setDiscussionsList(discussionsResponse.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if(uncheckedMessageCount != null && uncheckedMessageCount > 0) {
      fetchData()
    }
  }, [uncheckedMessageCount])

  return <div className="flex h-full flex-col">
    <div className="flex items-center text-lg font-bold">
      <div className="mr-auto">Messages</div>
      <Link to={{pathname: "new"}}>
        <FontAwesomeIcon icon="fa-solid fa-pencil-square" className="text-gray-700 shadow-md" />
      </Link>
      <Link to={{pathname: "new_box"}} className="ml-2">
        <FontAwesomeIcon icon="fa-solid fa-users" className="text-sm text-gray-700 shadow-md" />
      </Link>
    </div>
    <BestFriends />
    {/* search bar */}
    <form 
      className="mt-4"
      onSubmit={searchSubmitHandler} 
    >
      <div className="flex items-center py-2 px-4 bg-gray-200 rounded-lg shadow-sm">
        <input 
          type="text" 
          name="" 
          id="" 
          className="grow outline-none bg-transparent text-sm"
          placeholder="Search a message"
        />
        <button type="submit">
          <FontAwesomeIcon icon="fa-solid fa-search" />
        </button>
      </div>
    </form>
    <div className="w-full grow overflow-scroll mt-4">
      <div className="text-gray-600 text-sm font-semibold">All chat</div>
      {discussionsList.map(disc => <DiscussionItem key={disc.id} discussion={disc} />)}
    </div>
  </div>
}

export default RightDiscussions