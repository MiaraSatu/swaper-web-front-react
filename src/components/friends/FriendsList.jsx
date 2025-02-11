import { useEffect, useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import { apiFetch, apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"


const FriendsList = () => {
  const {friendsList, addFriendsList, setFriendsList} = useFriends()
  const {user, token} = useAuth()
  const [seeMoreUrl, setMoreUrl] = useState("")
  
  const seeMoreHandler = async () => {
    console.log(seeMoreUrl)
    const more = await apiFetch(seeMoreUrl, token)
    if(more) {
      addFriendsList(more.data)
      setMoreUrl(seeMoreUrl = more.seeMoreUrl)
    }
  } 

  useEffect(() => {
    async function loadFriends () {
      const response = await usersService.fetchPaginedFriends(user.id, token)
      setFriendsList(response.data)
      setMoreUrl(response.seeMoreUrl)
    }
    loadFriends()
  }, [])

  return <div>
    <div className="text-lg font-bold">All your friends</div>
    <div className="mt-4">
      {friendsList.map((friend) => <FriendItem key={friend.id} friend={friend} />)}
      <button onClick={seeMoreHandler}>
        See more
      </button>
    </div>
  </div>
}

const FriendItem = ({friend}) => {
  const navigate = useNavigate()

  return <div className="flex my-3 p-3 rounded shadow-md bg-gray-100">
    <div className="w-16 h-16 rounded-full min-w-16">
      <img src={friend.imageUrl ? apiImageUrl(friend.imageUrl) : avatar} alt={friend.name} className="w-full h-full object-cover" />
    </div>
    <div className="w-full ml-2">
      <div className="font-semibold">{friend.name}</div>
      <div className="text-sm text-gray-500">{friend.email}</div>
      <div className="w-full mt-2 flex justify-end">
        <button 
          className="py-1 px-3 text-sm rounded-md text-gray-50 bg-gray-900"
          onClick={() => navigate("/"+friend.id)}
        >
          <FontAwesomeIcon icon="fa-solid fa-envelope" className="mr-2" />
          Chat
        </button>
      </div>
    </div>
  </div>
}

export default FriendsList