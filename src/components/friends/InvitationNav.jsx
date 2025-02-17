import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"

const InvitationNav = () => {
  const navigate = useNavigate()

  const changeSelectHandler = (e) => {
    navigate(`/friends/${e.target.value}`)
  }

  return <div className="w-full flex text-xl font-bold">
    <select onChange={changeSelectHandler} defaultValue={"suggestions"}>
      <option value="suggestions">Suggestions</option>
      <option value="requests">Friend Request</option>
    </select>
    <Link to={{pathname: "../search"}} className="ml-auto w-8 h-8 flex justify-center items-center rounded bg-gray-300">
      <FontAwesomeIcon icon="fa-solid fa-search" />
    </Link>
  </div>
}

export default InvitationNav