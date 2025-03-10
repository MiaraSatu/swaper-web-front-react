import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import usersService from "../services/UsersService"
import { useAuth } from "../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EditPictureModal from "./profile/EditPictureModal"
import EditProfileModal from "./profile/EditProfileModal"
import useProfile from "../hooks/useProfile"
import MessagesService from "../services/MessagesService"
import AppService from "../services/AppService"

const Profile = () => {
  const {userId} = useParams()
  const {user, token} = useAuth()
  const {setFriends, setDiscussions} = useProfile()

  const [currentUser, setCurrentUser] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openEditPictureModal, setOpenEditPictureModal] = useState(false)

  const fetchUser = async () => {
    const id = userId ? userId : user.id
    const response = await usersService.getUser(id, token)
    if(response) {
      setCurrentUser(response)
    }
  }

  const fetchAboutUser = async () => {
    const friendsResponse = await usersService.fetchBestFriends(token)
    if(friendsResponse) {
      setFriends(friendsResponse)
    }
    const discussionsResponse = await MessagesService.fetchDiscussions(token)
    if(discussionsResponse) {
      setDiscussions(discussionsResponse.data)
    }
  }

  const handleUpdate = (updated) => {
    setCurrentUser(updated)
    setOpenEditModal(false)
  }

  const handleUpdatePicture = (updated) => {
    setCurrentUser(updated)
    setOpenEditPictureModal(false)
  }

  useEffect(() => {
    fetchUser()
    fetchAboutUser()
  }, [])

  return <div className="w-full h-screen">
    { currentUser
      ? <div className="w-full">
          {openEditModal 
            ? <EditProfileModal user={currentUser} onClose={() => setOpenEditModal(false)} onUpdate={handleUpdate} />
            : <></>
          }
          {openEditPictureModal
            ? <EditPictureModal onClose={() => setOpenEditPictureModal(false)} onUpdate={handleUpdatePicture} />
            : <></>
          }
          <div className="relative w-full px-20 bg-gray-400">
            <div className="relative top-32 flex items-center">
              <div className="relative w-64 h-64 mr-2">
                <button className="absolute bottom-4 right-4" onClick={() => setOpenEditPictureModal(true)}>
                  <FontAwesomeIcon icon="fa-solid fa-camera" className="text-xl" />
                </button>
                <img 
                  className="rounded-full w-64 h-64 object-cover shadow"
                  src={AppService.loadImage(currentUser.imageUrl)} 
                  alt={currentUser.name}
                />
              </div>
              <div>
                <div className="font-semibold text-xl">{currentUser.name}</div>
                <div className="text-gray-700">{currentUser.email}</div>
              </div>
            </div>
          </div>
          <div className="px-20 mt-36">
            <Link>
              <button className="px-3 py-2 text-white bg-blue-600 rounded" onClick={() => setOpenEditModal(true)}>Edit profile</button>
            </Link>
            <Link className="ml-2">
              <button className="px-3 py-2 text-white bg-red-600 rounded">Drop account</button>
            </Link>
          </div>
          <div className="px-20">
            <ul className="flex mt-4">
              <li className="mr-4">
                <NavLink to={{pathname: "friends"}}>Friends (125)</NavLink>              
              </li>
              <li>
                <NavLink to={{pathname: "discussions"}}>Discussions (23)</NavLink>
              </li>
            </ul>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      : <div>User not found</div>
    }
  </div>
}

export default Profile