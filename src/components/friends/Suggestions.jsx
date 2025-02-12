import { useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import SuggestionItem from "./SuggestionItem"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import InvitationModal from "./InvitationModal"

const Suggestions = () => {
  const {suggestionsList} = useFriends()
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