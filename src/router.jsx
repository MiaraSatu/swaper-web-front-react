import { createBrowserRouter, Link, Navigate, Outlet } from "react-router-dom";
import Discussions from "./components/Discussions";
import LeftBar from "./components/LeftBar";
import Friends from "./components/Friends";
import Received from "./components/friends/Received";
import Sent from "./components/friends/Sent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="w-full h-screen flex"> 
      <div className="w-1/6 h-full">
        <LeftBar />
      </div>
      <div className="w-5/6 h-full">
        <Outlet />
      </div>
    </div>,
    children: [
      {
        path: "",
        element: 
        <Discussions />
      },
      {
        path: "friends/",
        element: <Friends />,
        children: [
          {index: true, element: <Navigate to="received/" replace />},
          {
            path: "received/",
            element: <Received />
          },
          {
            path: "sent/",
            element: <Sent />
          }
        ]
      },
      {
        path: "groups",
        element: <div>
          I'm the group element
        </div>
      },
      {
        path: "favorites",
        element: <div>
          Favorite elements neeggggaa!
        </div>
      }
    ]
  }
])