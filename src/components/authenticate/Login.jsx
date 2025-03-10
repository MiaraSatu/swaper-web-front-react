import { useEffect, useState } from "react"
import LoginService from "../../services/LoginService"
import { useAuth } from "../../hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Login = ({changeCurrent}) => {
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("user")
  const [errorMessage, setError] = useState(null)
  const {login} = useAuth()

  const submitFormHandler = async (e) => {
    e.preventDefault()
    const response = await LoginService.apiLogin({username: email, password: password})
    if(response) { 
      login(response.token, response.user)
    } else {
      setError("Identity incorrect!")
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
            You can communicate with all your friends here! just send her an invitation and you can do what you want with her!
          </div>
          {
            (errorMessage) 
            ? <div className="my-4 text-sm text-red-600">
              <span className="mr-3">
                <FontAwesomeIcon icon="fa-solid fa-warning"/>
              </span>
              {errorMessage}
            </div>
            : <></>
          }
        </div>
        <form className="bock" onSubmit={submitFormHandler}>
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
          <button 
            className="w-full py-3 bg-gray-900 text-gray-100"
            type="submit"
          >Login</button>
        </form>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-200">
        <div>Forgot password</div>
        <button onClick={() => changeCurrent()}>Sign up</button>
      </div>
    </div>
  </div>
}

export default Login