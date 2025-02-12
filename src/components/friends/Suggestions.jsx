import { useEffect, useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import SuggestionItem from "./SuggestionItem"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import InvitationModal from "./InvitationModal"

const Suggestions = () => {
  const {suggestionsList, setSuggestionsList} = useFriends()
  const {token} = useAuth()
  const navigate = useNavigate()

  const [currentReceiver, setCurrentReceiver] = useState(null)

  const openModal = (receiver) => {
    setCurrentReceiver(receiver)
  }

  const closeModal = () => {
    setCurrentReceiver(null)
  }

  const changeSelectHandler = (e) => {
    if(e.target.value == "requests") {
      navigate("/friends/requests")
    }
  }

  const cancelInvitationHandler = async (userId) => { // by user id
    const response = await usersService.cancelInvitation(userId, token, true)
    if(response) {

    }
  }

  async function fetchSuggestions() {
    if(suggestionsList.length > 0) return;
    const suggestionsResponse = await usersService.fetchPaginedSuggestions(token)
    if(suggestionsResponse) 
      setSuggestionsList(suggestionsResponse.data, true)
  }

  useEffect(() => {
    fetchSuggestions()
  }, [])

  return <>
    {
      (currentReceiver)
      ? <InvitationModal receiver={currentReceiver} onClose={closeModal} />
      : <></>
    }
    <div className="w-full text-xl font-bold">
      <select onChange={changeSelectHandler} defaultValue={"suggestions"}>
        <option value="suggestions">Suggestions</option>
        <option value="requests">Friend Request</option>
      </select>
    </div>
    <div className="w-full flex flex-wrap mt-4">
      {suggestionsList.map(user => <SuggestionItem 
        key={user.id} 
        user={user} 
        openInvitationModal={openModal}
      />)}
    </div>
  </>
}

export default Suggestions