import { useFriends } from "../../hooks/useFriends"
import { useAuth } from "../../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import UsersService from "../../services/UsersService"
import AppService from "../../services/AppService"
import ApiService from "../../services/ApiService"


const FriendsList = () => {
  const {friendsList, addFriendsList, setFriendsList} = useFriends()
  const {token, user} = useAuth()
  const [seeMoreUrl, setMoreUrl] = useState("")
  const [searchResponse, setSearchResponse] = useState(null)

  const searchResponseHandler = (response) => {
    if(!response) {
      setSearchResponse(null);
      return;
    }
    setSearchResponse(response)
  }

  const fetchFriends = async () => {
    console.log("Fetch lanced [friendsList]")
    const response = await UsersService.fetchPaginedFriends(user.id, token)
    if(response) {
      setFriendsList(response.data);
      setMoreUrl(response.seeMoreUrl)
    }
  }
  
  const seeMoreHandler = async () => {
    console.log("seeMoreUrl value is", seeMoreUrl)
    const more = await ApiService.fetch(seeMoreUrl, token)
    if(more) {
      addFriendsList(more.data)
      setMoreUrl(seeMoreUrl = more.seeMoreUrl)
    }
  }

  useEffect(() => {
    if(friendsList.length > 0) return ;
    fetchFriends()
  }, [])

  return <div className="w-full h-full flex flex-col">
    <div className="w-full text-lg font-bold">All your friends</div>
    <SearchFriendForm onSearch={searchResponseHandler} />
    <div className="grow overflow-scroll w-full mt-4">
      {searchResponse 
        ? searchResponse.map(result => <FriendItem key={result.id} friend={result} />)
        : friendsList.map((friend) => <FriendItem key={friend.id} friend={friend} />)
      }
      <button 
        className="w-full py-1 border-2 border-gray-900 rounded-md hover:bg-gray-200 hover:shadow-md disabled:text-gray-600 disabled:hover:bg-white disabled:border-gray-400"
        onClick={seeMoreHandler} 
        disabled={seeMoreUrl == null}
      >
        See more
      </button>
    </div>
  </div>
}

const FriendItem = ({friend}) => {
  const navigate = useNavigate()

  return <div className="flex w-full my-3 p-3 rounded shadow-md bg-gray-100">
    <div className="w-16 h-16 rounded-full min-w-16">
      <img src={AppService.loadImage(friend.imageUrl)} alt={friend.name} className="w-full h-full rounded-full object-cover" />
    </div>
    <div className="grow ml-2 overflow-hidden text-ellipsis">
      <div className="font-semibold">{friend.name}</div>
      <div className="text-sm text-gray-500">{friend.email}</div>
      <div className="w-full mt-2 flex justify-end">
        <button 
          className="py-1 px-3 text-sm rounded-md text-gray-50 bg-gray-900"
          onClick={() => navigate("/discussion/"+friend.id)}
        >
          <FontAwesomeIcon icon="fa-solid fa-envelope" className="mr-2" />
          Chat
        </button>
      </div>
    </div>
  </div>
}

const SearchFriendForm = ({onSearch}) => {
  const {token} = useAuth()
  const [keyword, setKeyword] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();
  }

  const changeKeywordHandler = async (e) => {
    setKeyword(e.target.value)
    if(e.target.value == "") {
      onSearch(null)
      return;
    }
    const response = await UsersService.searchFriend(e.target.value, token)
    onSearch(response)
  }

  return <div className="w-full">
    <form 
      className="w-full"
      onSubmit={submitHandler}
    >
      <div className="w-full flex px-4 py-2 rounded-xl shadow-sm bg-gray-200">
        <input 
          className="grow border-none outline-none bg-transparent"
          type="text" 
          placeholder="Search a friend"
          value={keyword} 
          onChange={changeKeywordHandler} 
        />
        <button type="submit">
          <FontAwesomeIcon icon="fa-solid fa-search" />
        </button>
      </div>
    </form>
  </div>
}

export default FriendsList