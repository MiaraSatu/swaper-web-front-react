import { RouterProvider } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { router } from "../router"
import Login from "./Login"

const Root = () => {
  const {isAuthenticated, user, logout} = useAuth()

  if(isAuthenticated) {
    return <>
      <div>
        {user.name} ({user.email})
      </div>
      <button onClick={() => logout()}>
        logout
      </button>
      <RouterProvider router={router} />
    </>
  }
  return <Login />
}

export default Root