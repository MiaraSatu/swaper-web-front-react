import { useFriends } from "../../hooks/useFriends"
import InvitationItem from "./InvitationItem"
import { useOutletContext } from "react-router-dom"

const Received = () => {
  const {onAccept, onRefuse} = useOutletContext()
  const {receivedRequests} = useFriends()

  return <>
    {receivedRequests.map(req => <InvitationItem 
      key={req.id}
      invitation={req}
      subjectStatus="sender"
    />)}
  </>
}

export default Received