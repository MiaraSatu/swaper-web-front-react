import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BestFriends from "./discussions/BestFriends"

const Discussions = () => {
  return <div className="w-full h-full flex">
    <div id="main" className="w-3/4">
      A focused message contents will display here!
    </div>
    <div id="discussions" className="w-1/4 py-4 px-8">
      <div className="flex justify-between items-center text-lg font-bold">
        <div>Messages</div>
        <FontAwesomeIcon icon="fa-solid fa-pencil-square" className="text-gray-700 shadow-md" />
      </div>
      <BestFriends />
    </div>
  </div>
}

export default Discussions