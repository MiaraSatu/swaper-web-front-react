import { useEffect, useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import usersService from "../../services/usersService"
import { useAuth } from "../../hooks/useAuth"

const Invitations = () => {
  const {token} = useAuth()
  const [filter, setFilter] = useState("received")
  const {receivedRequests, sentRequests, refusedRequests, suggestionsList, setRequests, setSuggestionsList} = useFriends()

  const changeFilterHandler = (newFilter) => {
    setFilter(newFilter)
  }

  useEffect(() => {
    const fetchRequests = async () => {
      const receivedResponse = await usersService.fetchPaginedInvitations("received", token)
      const sentResponse = await usersService.fetchPaginedInvitations("sent", token)
      const refusedResponse = await usersService.fetchPaginedInvitations("refused", token)
      const suggestionsResponse = await usersService.fetchPaginedSuggestions(token)
      if(receivedResponse)
        setRequests("received", receivedResponse.data, true)
      if(sentResponse)
        setRequests("sent", sentResponse.data, true)
      if(refusedResponse)
        setRequests("refused", refusedResponse.data, true)
      if(suggestionsResponse) 
        setSuggestionsList(suggestionsResponse.data, true)

      console.log(suggestionsList)
    }
    fetchRequests()
  }, [])

  return <div>
    <div>
      <div className="text-xl font-bold">Suggestions</div>
      <div>
        {suggestionsList.map(user => <div key={user.id}>{user.name} ({user.email})</div>)}
      </div>
    </div>
    <div className="text-xl font-bold">Friends Request</div>
      <ul className="flex cursor-pointer mt-3" id="friends-list-filter">
        <li 
          className={"mr-4 px-3 py-1 "+(filter == "received" ? "active" : "")}
          onClick={() => changeFilterHandler("received")}
        >
          Received
        </li>
        <li 
          className={"mr-4 px-3 py-1 "+(filter == "sent" ? "active" : "")}
          onClick={() => changeFilterHandler("sent")}
        >
          Sent
        </li>
        <li 
          className={"mr-4 px-3 py-1 "+(filter == "refused" ? "active" : "")}
          onClick={() => changeFilterHandler("refused")}
        >
          Refused
        </li>
      </ul>
      <div className="mt-3">
        {("received" == filter)
          ? receivedRequests.map(req => <div key={req.id}>{req.sender.name}</div>)
          : <></>
        }
        {("sent" == filter)
          ? sentRequests.map(req => <div key={req.id}>{req.receiver.name}</div>)
          : <></>
        }
        {
          ("refused" == filter)
          ? refusedRequests.map(req => <div key={req.id}>{req.receiver.name}</div>)
          : <></>
        }
      </div>
  </div>
}

export default Invitations