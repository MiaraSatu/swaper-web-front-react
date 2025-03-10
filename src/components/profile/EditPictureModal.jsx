import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import usersService from "../../services/UsersService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

export default EditPictureModal