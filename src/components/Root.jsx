import { Outlet, RouterProvider } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { router } from "../router"
import Authenticate from "./Authenticate"

const Root = () => {
  const {isAuthenticated} = useAuth()

  if(isAuthenticated) {
    return <RouterProvider router={router} />
  }
  return <Authenticate />
}

export default Root