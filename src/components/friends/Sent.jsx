import { useOutletContext } from "react-router-dom"
import { useFriends } from "../../hooks/useFriends"
import InvitationItem from "./InvitationItem"

const Sent = () => {
  const {sentRequests} = useFriends()
  const {openModal} = useOutletContext()

  return <>
    {sentRequests.map(request => <InvitationItem 
      key={request.id}
      invitation={request}
      subjectStatus="receiver"
      openModal={openModal}
    />)}
  </>

}

export default Sent