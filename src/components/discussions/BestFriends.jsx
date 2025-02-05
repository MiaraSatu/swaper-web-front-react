import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import usersService from "../../services/usersService"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"

const BestFriends = () => {
  const {token} = useAuth()
  const [bestFriends, setBestFriends] = useState([])

  useEffect(() => {
    const loadBestFriends = async () => {
      const bf = await usersService.fetchBestFriends(token)
      if(bf) setBestFriends(bf)
    }
    loadBestFriends()
  }, [])

  return <div className="flex flex-nowrap">
    {bestFriends.map(friend => <div key={friend.id} className="text-center bg-gray-100 p-2 mx-1 rounded-md shadow-sm">
      <div className="w-12 h-12 min-w-12 min-h-12">
        <img 
          src={friend.imageUrl ? apiImageUrl(friend.imageUrl) : avatar} 
          alt={friend.name} 
          className="object-cover"
        />
      </div>
      <div className="w-12 overflow-hidden text-ellipsis text-xs text-gray-800 font-semibold">{friend.name}</div>
    </div>)}
  </div>
}

export default BestFriends