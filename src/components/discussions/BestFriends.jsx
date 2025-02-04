import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import usersService from "../../services/usersService"

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

  return <div>
    The bests friends will display here!
    {bestFriends.map(friend => <div key={friend.id}>{friend.name}</div>)}
  </div>
}

export default BestFriends