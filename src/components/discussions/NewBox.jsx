import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import usersService from "../../services/UsersService"
import { useAuth } from "../../hooks/useAuth"
import MessagesService from "../../services/MessagesService"
import { useNavigate } from "react-router-dom"
import AppService from "../../services/AppService"

const NewBox = () => {
  const navigate = useNavigate()
  const {token} = useAuth()
  const [members, setMembers] = useState([])
  const [results, setResults] = useState(null)
  const [keyword, setKeyword] = useState("")

  // form controller
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleChangeName = (e) => setName(e.target.value)

  const handleChangeDescription = (e) => setDescription(e.target.value)

  const handleChangeKeyword = async (e) => {
    setKeyword(e.target.value)
    if(e.target.value == "") {
      setResults(null)
      return;
    }
    const response = await usersService.searchFriend(e.target.value, token)
    if(response) {
      // setResults(response)
      setResults(response.filter(user => {
        for (const member of members) {
          if(member.id == user.id) return false;
        }
        return true;
      }))
    }
  }

  const addMember = (user) => {
    if(members.includes(user)) return ;
    setMembers([...members, user])
    setResults([...results.filter(res => res.id != user.id)])
  }

  const removeMember = (user) => {
    if(user) {
      setMembers([...members.filter(member => member.id != user.id)])
    }
  }

  const handleSubmitBox = async (e) => {
    e.preventDefault()
    if(name == "" || members.length == 0) return ;
    const createdBox = await MessagesService.createBox({name: name, description: description}, token)
    if(createdBox) {
      const addedMembers = await MessagesService.addBoxMember(createdBox.id, members, token)
      if(addedMembers) {
        await MessagesService.sendMessage({content: `Hello everyone, I created a groupe named "${name}", ${description != "" ? description : ''}`}, "box", createdBox.id, token)
        console.log("Box created successfully")
        setMembers([])
        setResults(null)
        setKeyword("")
        setName("")
        setDescription("")
        navigate("/discussion/b"+createdBox.id)
      }else {
        console.log("Not successfully")
      }
    }
  }

  return <div className="w-full h-full">
    <div className="w-full h-16 px-8 flex items-center text-lg bg-gray-100 shadow">
      <FontAwesomeIcon icon="fa-solid fa-users" className="mr-2" />
      Create new discussion box
    </div>
    <div className="w-full px-8 py-4">
      <form onSubmit={handleSubmitBox} className="w-1/2">
        <label htmlFor="f-name" className="block">Box name</label>
        <input 
          className="w-full border border-gray-600 px-2"
          id="f-name"
          type="text"
          placeholder="E.g: utimate team" 
          value={name}
          onChange={handleChangeName}
        />
        <br />
        <label htmlFor="f-description" className="block">Description</label>
        <textarea 
          className="w-full border border-gray-600 px-2"
          id="f-description"
          placeholder="Team description"
          value={description}
          onChange={handleChangeDescription} 
        />
        <div className="w-full mt-2">
          <label className="block">Select members</label>
          {members && members.length > 0
            ? <div>
                {members.map(user => <div key={user.id} onClick={() => removeMember(user)}>
                  <img 
                    className="inline w-6 h-6 rounded-full mr-2"
                    src={AppService.loadImage(user.imageUrl)} 
                    alt={user.name} 
                  />
                  {user.name}
                  <FontAwesomeIcon icon="fa-solid fa-x" className="ml-2 text-xs text-red-600" />
                </div>)}
              </div>
            : <></>
          }
          <div className="w-full px-2 py-1 border border-gray-400">
            <FontAwesomeIcon icon="fa-solid fa-search" className="text-gray-600 mr-2" />
            <input
              className="outline-none bg-transparent" 
              type="text" 
              placeholder="Friend's name"
              value={keyword}
              onChange={handleChangeKeyword}
            />
          </div>
          {results && results.length > 0
            ? <div>
                {results.map(user => <div key={user.id} className="flex my-2" onClick={() => addMember(user)}>
                  <img src={AppService.loadImage(user.imageUrl)} alt={user.name} className="w-6 h-6 mr-2 rounded-full object-cover" />
                  {user.name}
                  <FontAwesomeIcon icon="fa-solid fa-check" className={`${!user.added ? "hidden" : ""} text-sm text-blue-500`} />
                </div>)}
              </div> 
            : <></>
          }
        </div>
        <button type="submit" className="mt-4 px-2 py-1 rounded-md bg-gray-900 text-gray-50">
          Create box
        </button>
      </form>
    </div>
  </div>
}


export default NewBox