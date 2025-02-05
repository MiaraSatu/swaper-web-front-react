import { useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import InvitationModal from "./InvitationModal"
import SuggestionItem from "./SuggestionItem"

const Suggestions = () => {
  const {suggestionsList} = useFriends()

  const [currentReceiver, setCurrentReceiver] = useState(null)

  const openModal = (receiver) => {
    setCurrentReceiver(receiver)
  }

  const closeModal = () => {
    setCurrentReceiver(null)
  }

  return <>
    {
      (currentReceiver)
      ? <InvitationModal receiver={currentReceiver} onClose={closeModal} />
      : <></>
    }
    <div className="w-full text-xl font-bold">Suggestions</div>
    <div className="w-full flex flex-wrap">
      {suggestionsList.map(user => <SuggestionItem key={user.id} user={user} sendInvitation={openModal} />)}
    </div>
  </>
}

export default Suggestions