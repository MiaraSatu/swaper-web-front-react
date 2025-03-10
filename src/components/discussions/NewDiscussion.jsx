import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import UsersService from "../../services/UsersService"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import AppService from "../../services/AppService"

const NewDiscussion = () => {
  const navigate = useNavigate()
  const {token} = useAuth()
  const [keyword, setKeyword] = useState("")
  const [results, setResults] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const handleChangeKeyword = async (e) => {
    setKeyword(e.target.value)
    if(e.target.value == "") {
      fetchDefaultResult();
      return ;
    }
    const response = await UsersService.searchFriend(e.target.value, token)
    if(response) setResults(response)
  }

  async function fetchDefaultResult() {
    const response = await UsersService.fetchBestFriends(token)
    if(response) setResults(response)
  }

  useEffect(() => {
    fetchDefaultResult()
  }, [])

  return <div className="w-full h-full">
    <div className="h-16 px-8 flex items-center bg-gray-100 shadow">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="">
          <FontAwesomeIcon icon="fa-solid fa-search" className="mr-2 text-gray-700" />
          <input 
            type="text"
            placeholder="Choise the person"
            className="bg-transparent outline-none" 
            value={keyword}
            onChange={handleChangeKeyword}
          />
        </div>
      </form>
    </div>
    <div className="px-8">
      <div className="font-semibold">Choise the person you want to chat</div>
      {results && results.length > 0
        ? results.map( user => <div key={user.id} className="flex items-center mt-4 cursor-pointer" onClick={() => navigate("../"+user.id)}>
              <img 
                className="w-8 h-8 object-cover rounded-full mr-2"
                src={AppService.loadImage(user.imageUrl)} 
                alt={user.name}
              />
              <div className="">{user.name}</div>
            </div>)
        : <></>
      }
    </div>
  </div>
}

export default NewDiscussion