import { useState } from "react"
import loginService from "../services/loginService"
import { useAuth } from "../hooks/auth"

const Login = () => {
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("user")
  const {login} = useAuth()

  const submitFormHandler = async (e) => {
    e.preventDefault()
    const response = await loginService.apiLogin({username: email, password: password})
    if(response) {
      login(response.token, response.user)
    }
  }

  return <div>
    Please check login before enter here!!!!
    <form className="bock" onSubmit={submitFormHandler}>
      <div>
        <label htmlFor="f-email">email</label>
        <input type="text" name="email" id="f-email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="f-password">password</label>
        <input type="password" name="password" id="f-password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
}

export default Login