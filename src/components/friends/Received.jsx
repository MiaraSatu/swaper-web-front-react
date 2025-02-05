import { useState } from "react"
import { useFriends } from "../../hooks/useFriends"
import RefuseModal from "./RefuseModal"
import InvitationItem from "./InvitationItem"
import { useOutletContext } from "react-router-dom"

const Received = () => {
  const {openModal} = useOutletContext()
  const {receivedRequests} = useFriends()

  const [currentRequest, setCurrentRequest] = useState(null)

  const showRefuseModal = (request) => {
    setCurrentRequest(request) 
  }
  const closeModalHandler = () => {
    setCurrentRequest(null)
  }

  return <>
    {currentRequest ? <RefuseModal request={currentRequest} onClose={closeModalHandler} /> : <></>}
    {receivedRequests.map(req => <InvitationItem 
      key={req.id}
      invitation={req}
      onRefuse={showRefuseModal}
      subjectStatus="sender"
      openModal={openModal}
    />)}
  </>
}

export default Received