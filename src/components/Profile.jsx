import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import usersService from "../services/usersService"
import { useAuth } from "../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { appService } from "../services/appService"
import EditPictureModal from "./profile/EditPictureModal"
import EditProfileModal from "./profile/EditProfileModal"

const Profile = () => {
  const {userId} = useParams()
  const {user, token} = useAuth()
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
                  src={appService.loadImage(currentUser.imageUrl)} 
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
        </div>
      : <div>User not found</div>
    }
  </div>
}

export default Profile