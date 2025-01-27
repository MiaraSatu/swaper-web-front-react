import { RouterProvider } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { router } from "../router"
import Login from "./Login"

const Root = () => {
  const {isAuthenticated} = useAuth()
  if(isAuthenticated) {
    return <RouterProvider router={router} />
  }
  return <Login />
}

export default Root