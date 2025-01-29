import { useState } from "react"
import Login from "./authenticate/Login"
import Register from "./authenticate/Register"

const Authenticate = () => {
  const [isLoginCurrent, setLoginCurrent] = useState(true)

  const changeCurrentHandler = () => {
    setLoginCurrent(!isLoginCurrent)
  }

  return (isLoginCurrent) 
    ? <Login changeCurrent={changeCurrentHandler} />
    : <Register changeCurrent={changeCurrentHandler} />
}

export default Authenticate