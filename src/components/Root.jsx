import { RouterProvider } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { router } from "../router"

const Root = () => {
  const {isAuthenticated} = useAuth()
  if(isAuthenticated) {
    return <RouterProvider router={router} />
  }
  return <div>Please check login before enter here! OOOUUUT</div>
}

export default Root