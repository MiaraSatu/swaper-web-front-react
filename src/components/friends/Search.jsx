import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import UsersService from "../../services/UsersService"
import { useAuth } from "../../hooks/useAuth"
import useSearch from "../../hooks/useSearch"
import { useNavigate } from "react-router-dom"
import InvitationModal from "./InvitationModal"
import ReceivedInvitationModal from "./ReceivedInvitationModal"
import AppService from "../../services/AppService"
import ResultOptions from "./ResultOptions"

const Search = () => {
  const navigate = useNavigate()
  const {token} = useAuth()
  const [keyword, setKeyword] = useState("")
  const {results, setResults} = useSearch()
  const [currentReceiver, setCurrentReceiver] = useState(null)
  const [currentSender, setCurrentSender] = useState(null)

  const changeKeywordHandler = async (e) => {
    setKeyword(e.target.value)
    if(e.target.value == "") {
      setResults(null)
      return ;
    }
    const response = await UsersService.search(e.target.value, token)
    if(response) {
      setResults(response)
    } else {
      console.log("response",response)
    }
  }

  return <div className="">
    {currentReceiver ? <InvitationModal receiver={currentReceiver} onClose={() => setCurrentReceiver(null)} /> : <></> }
    {currentSender ? <ReceivedInvitationModal sender={currentSender} onClose={() => setCurrentSender(null)} /> : <></>}
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex px-4 py-2 bg-gray-200 rounded-lg shadow-lg">
        <button className="text-2xl" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </button>
        <input 
          type="text" 
          onChange={changeKeywordHandler} 
          value={keyword} 
          placeholder="Search a user by name"
          className="grow outline-none mx-2 bg-transparent"
        />
        <button type="submit" className="text-2xl">
          <FontAwesomeIcon icon="fa-solid fa-search" />
        </button>
      </div>
    </form>
    {results 
      ? <div>
          {results.map(user => <div key={user.id} className="flex p-4 mt-3 rounded-md shadow bg-white">
            <img 
              className="w-16 h-16 rounded-full object-cover mr-2"
              src={AppService.loadImage(user.imageUrl)} 
              alt={user.name} 
            />
            <div>
              <div className="text-lg font-semibold">{user.name}</div>
              <div className="text-gray-600">{user.email}</div>
            </div>
            <div className="ml-auto">
              <ResultOptions user={user} onOpenSendRequestModal={(u) => setCurrentReceiver(u)} onOpenReceivedRequestModal={(u) => setCurrentSender(u) } />
            </div>
          </div>)}
        </div>
      :<></>
    }
  </div>
}

export default Search