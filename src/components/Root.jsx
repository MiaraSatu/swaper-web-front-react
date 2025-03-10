import { Outlet, RouterProvider } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { router } from "../router"
import Authenticate from "./Authenticate"
import { WebSocketProvider } from "../hooks/useWebSocket"

const Root = () => {
  const {isAuthenticated} = useAuth()

  if(isAuthenticated) {
    return (
      <WebSocketProvider>
        <RouterProvider router={router} />
      </WebSocketProvider>
    );
  }
  return <Authenticate />
}

export default Root