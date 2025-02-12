import { useFriends } from "../../hooks/useFriends"
import InvitationItem from "./InvitationItem"

const Received = () => {
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