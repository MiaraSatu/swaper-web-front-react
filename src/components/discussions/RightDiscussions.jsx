import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BestFriends from "./BestFriends"
import { useEffect, useState } from "react"
import { messagesService } from "../../services/messagesService"
import { useAuth } from "../../hooks/useAuth"
import useDiscussions from "../../hooks/useDiscussions"
import DiscussionItem from "./DiscussionItem"
import useHome from "../../hooks/useHome"

const RightDiscussions = () => {
  const {token} = useAuth()
  const {discussionsList, setDiscussionsList} = useDiscussions()

  const searchSubmitHandler = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    async function fetchData() {
      const discussionsResponse = await messagesService.fetchDiscussions(token)
      if(discussionsResponse) {
        setDiscussionsList(discussionsResponse.data)
      }
    }
    fetchData()
  }, [])

  return <>
    <div className="flex justify-between items-center text-lg font-bold">
      <div>Messages</div>
      <FontAwesomeIcon icon="fa-solid fa-pencil-square" className="text-gray-700 shadow-md" />
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
    <div className="w-full mt-4">
      <div className="text-gray-600 text-sm font-semibold">All chat</div>
      {discussionsList.map(disc => <DiscussionItem key={disc.id} discussion={disc} />)}
    </div>
  </>
}

export default RightDiscussions