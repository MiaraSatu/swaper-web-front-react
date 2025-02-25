import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import usersService from "../services/usersService"
import { useAuth } from "../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { appService } from "../services/appService"

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

const EditProfileModal = ({user, onClose, onUpdate}) => {
  const {token} = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(name == user.name && email == user.email) {
      onClose()
      return ;
    }
    const updatedUser = {...user, name: name, email: email}
    const response = await usersService.updateUser(updatedUser, token)
    if(response) {
      onUpdate(response)
    }
  }

  return <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-80 absolute inset-0 z-50" onClick={onClose}>
    <div 
      onClick={(e) => e.stopPropagation()}
      className="relative w-1/3 p-8 bg-gray-50 rounded shadow"
    >
      <button 
        className="absolute right-8 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200 text-red-600 text-lg"
        onClick={onClose}
      >
        <FontAwesomeIcon icon="fa-solid fa-x" />
      </button>
      <h1 className="font-semibold text-lg">Edit you profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-2">
          <label htmlFor="f-name" className="block">Name</label>
          <input 
            className="w-full border py-1 px-2 rounded border-gray-500"
            type="text" 
            id="f-name"
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="f-email" className="block">Email</label>
          <input 
            className="w-full border py-1 px-2 border-gray-500"
            type="email" 
            id="f-email"
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
        </div>
        <button 
          className="block w-full py-2 mt-2 text-white bg-green-600 rounded"
          type="submit"
        >
          Save change
        </button>
      </form>
    </div>
  </div>
}

const EditPictureModal = ({onClose, onUpdate}) => {
  const {token} = useAuth()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    if(selectedFile) {
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!file) return;
    const formData = new FormData()
    formData.append("file", file)
    const response = await usersService.updatePicture(formData, token)
    if(response) {
      onClose()
      onUpdate(response)
    }
  }

  return <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-80 absolute inset-0 z-50" onClick={onClose}>
    <div 
      onClick={(e) => e.stopPropagation()}
      className="relative w-1/3 p-8 bg-gray-50 rounded shadow"
    >
      <button 
        className="absolute right-8 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200 text-red-600 text-lg"
        onClick={onClose}
      >
        <FontAwesomeIcon icon="fa-solid fa-x" />
      </button>
      <h1 className="font-semibold text-lg">Edit you profile picture</h1>
      <form onSubmit={handleSubmit}>
        {preview 
          ? <img src={preview} alt="aperçu de l'image" className="w-full rounded object-cover" />
          : <></>
        }
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit" className="w-full px-2 py-1 mt-2 rounded text-white bg-green-600">
          Save image
        </button>
      </form>
    </div>
  </div>
}

export default Profile