import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BestFriends from "./discussions/BestFriends"
import { DiscussionContextProvider } from "../hooks/useDiscussions"
import Discussion from "./discussions/Discussion"

const Discussions = () => {
  const searchSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return <DiscussionContextProvider>
    <div className="w-full h-full flex">
      <div className="w-3/4 bg-gray-50">
        <Discussion />
      </div>
      <div id="discussions" className="w-1/4 py-4 px-8">
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
      </div>
    </div>
  </DiscussionContextProvider>
}

export default Discussions