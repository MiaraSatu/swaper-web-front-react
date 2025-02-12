import { FriendsContextProvider} from "../hooks/useFriends"
import FriendsList from "./friends/FriendsList"
import Invitations from "./friends/Invitations"

const Friends = () => {
  return <FriendsContextProvider>
    <div className="w-full h-full flex">
      <div className="w-3/4 h-screen overflow-scroll px-8 py-4 bg-gray-50">
        <Invitations />
      </div>
      <div className="w-1/4 pr-8 pl-4 py-4">
        <FriendsList />
      </div>
    </div>
  </FriendsContextProvider>
}

export default Friends