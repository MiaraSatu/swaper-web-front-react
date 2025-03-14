import { useEffect, useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import SuggestionItem from "./SuggestionItem"
import { useAuth } from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import InvitationModal from "./InvitationModal"
import UsersService from "../../services/UsersService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import InvitationNav from "./InvitationNav"
import ApiService from "../../services/ApiService"

const Suggestions = () => {
  const navigate = useNavigate()
  const {suggestionsList, setSuggestionsList} = useFriends()
  const {token} = useAuth()

  const [currentReceiver, setCurrentReceiver] = useState(null)
  const [seeMoreUrl, setSeeMoreUrl] = useState(null)

  const openModal = (receiver) => {
    setCurrentReceiver(receiver)
  }

  const closeModal = () => {
    setCurrentReceiver(null)
  }

  const changeSelectHandler = (e) => {
    // if(e.target.value == "requests") {
    //   navigate("/friends/requests")
    // }
    navigate(`../${e.target.value}`)
  }

  const seeMoreHandler = async () => {
    const more = await ApiService.fetch(seeMoreUrl, token)
    if(more) {
      setSuggestionsList(more.data)
      setSeeMoreUrl(more.seeMoreUrl)
    }
  }

  const fetchSuggestions = async () => {
    console.log("Fetch lanced [Suggestions]")
    const suggestionsResponse = await UsersService.fetchPaginedSuggestions(token)
    if(suggestionsResponse) {
      setSuggestionsList(suggestionsResponse.data, true)
      setSeeMoreUrl(suggestionsResponse.seeMoreUrl)
    }
  }

  useEffect(() => {
    if(suggestionsList.length > 0) return;
    fetchSuggestions()
  }, [])

  return <>
    {
      (currentReceiver)
      ? <InvitationModal receiver={currentReceiver} onClose={closeModal} />
      : <></>
    }
    <InvitationNav />
    <div className="w-full flex flex-wrap mt-4">
      {suggestionsList.map(user => <SuggestionItem 
        key={user.id} 
        user={user} 
        openInvitationModal={openModal}
      />)}
      <button 
        className="w-64 flex justify-center items-center p-3 text-gray-800 bg-gray-200 shadow-sm mx-2 my-4 hover:shadow-md disabled:text-gray-500"
          onClick={seeMoreHandler}
          disabled={seeMoreUrl == null}
        >
          <FontAwesomeIcon icon="fa-solid fa-spinner" className="mr-2" />
          Load more
        </button>
    </div>
  </>
}

export default Suggestions