import useProfile from "../../hooks/useProfile"
import { appService } from "../../services/appService"
import ResultOptions from "../friends/ResultOptions"

const FriendsOverview = () => {
  const {friends} = useProfile()

  return <div className="w-full">
    {friends 
      ? <div className="flex">
          {friends.map(friend => <div key={friend.id} className="p-4 mt-3 rounded-md shadow bg-white">
            <div className="flex">
              <img 
                className="w-16 h-16 rounded-full object-cover mr-2"
                src={appService.loadImage(friend.imageUrl)} 
                alt={friend.name} 
              />
              <div>
                <div className="text-lg font-semibold">{friend.name}</div>
                <div className="text-gray-600">{friend.email}</div>
              </div>
            </div>
            <div className="ml-auto mt-2">
              <ResultOptions user={friend} onOpenSendRequestModal={(u) => setCurrentReceiver(u)} onOpenReceivedRequestModal={(u) => setCurrentSender(u) } />
            </div>
          </div>)}  
        </div>
      : <div>Friends is empty</div>
    }
  </div>
}

export default FriendsOverview