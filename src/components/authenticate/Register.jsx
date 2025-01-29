import { useState } from "react"
import loginService from "../../services/loginService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Register = ({changeCurrent}) => {
  const [name, setName] = useState("Raya")
  const [email, setEmail] = useState("raya@example.com")
  const [password, setPassword] = useState("raya")
  const [confirmPassword, setConfirmPassword] = useState("raya")
  const [error, setError] = useState(null)

  const submitFormHandler = async (e) => {
    e.preventDefault()
    if(confirmPassword != password) {
      return setError("Password not confirmed")
    }
    if(name == "" || email == "" || password.length < 4) {
      return setError("Recheck you form")
    }
    const response = await loginService.apiRegister({name: name, email: email, password: password})
    if(!response.error) {
      changeCurrent()
    } else {
      setError(response.error)
    }
  }

  return <div className="w-full h-screen flex items-center bg-gray-700">
    <div className="w-1/4 mx-auto">
      <div className="w-full pt-8 bg-gray-800 shadow-md">
        <div className="text-center mb-4 px-8">
          <div className="font-semibold text-lg text-gray-100">
            Welcome to the web chat app!
          </div>
          <div className="text-sm text-gray-300">
            Create your count and feel free to navigate in the app!!
          </div>
          { (error)
            ? <div className="text-sm text-red-500">
              <FontAwesomeIcon icon="fa-solid fa-warning" className="mr-2" />
              {error}
            </div>
            : <></>
          }
        </div>
        <form className="bock" onSubmit={submitFormHandler}>
          <div className="w-full px-8 py-3 shadow-inner shadow-gray-900">
            <input 
              className="w-full border-none outline-none bg-transparent text-gray-300 placeholder:text-gray-300"
              type="text" 
              name="name" 
              id="f-name" 
              placeholder="name" 
              value={name} 
              onChange={(e) => {setName(e.target.value)}} 
            />
          </div>
          <div className="w-full px-8 py-3 shadow-inner shadow-gray-900">
            <input 
              className="w-full border-none outline-none bg-transparent text-gray-300 placeholder:text-gray-300"
              type="text" 
              name="email" 
              id="f-email" 
              placeholder="email" 
              value={email} 
              onChange={(e) => {setEmail(e.target.value)}} 
            />
          </div>
          <div className="w-full px-8 py-3 shadow-inner shadow-gray-900">
            <input 
              className="w-full border-none outline-none bg-transparent text-gray-300 placeholder:text-gray-300"
              type="password" 
              name="password" 
              placeholder="password" 
              id="f-password" 
              value={password} 
              onChange={(e) => {setPassword(e.target.value)}} 
            />
          </div>
          <div className="w-full px-8 py-3 shadow-inner shadow-gray-900">
            <input 
              className="w-full border-none outline-none bg-transparent text-gray-300 placeholder:text-gray-300"
              type="password" 
              name="confirmPassword" 
              placeholder="Retype password" 
              id="f-confirm-password" 
              value={confirmPassword} 
              onChange={(e) => {setConfirmPassword(e.target.value)}} 
            />
          </div>
          <button 
            className="w-full py-3 bg-gray-900 text-gray-100"
            type="submit"
          >Register</button>
        </form>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-200">
        <div>If have already an account? click the right button</div>
        <button onClick={() => changeCurrent()}>Log in</button>
      </div>
    </div>
  </div>
}

export default Register