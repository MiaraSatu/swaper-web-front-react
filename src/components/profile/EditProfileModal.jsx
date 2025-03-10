import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import usersService from "../../services/UsersService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

export default EditProfileModal