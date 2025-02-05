import { useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import SuggestionItem from "./SuggestionItem"

const Suggestions = ({openModal}) => {
  const {suggestionsList} = useFriends()

  return <>
    <div className="w-full text-xl font-bold">Suggestions</div>
    <div className="w-full flex flex-wrap">
      {suggestionsList.map(user => <SuggestionItem key={user.id} user={user} sendInvitation={openModal} />)}
    </div>
  </>
}

export default Suggestions