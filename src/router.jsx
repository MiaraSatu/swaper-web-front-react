import { createBrowserRouter, Link, Navigate, Outlet } from "react-router-dom";
import Discussions from "./components/Discussions";
import LeftBar from "./components/LeftBar";
import Friends from "./components/Friends";
import Received from "./components/friends/Received";
import Sent from "./components/friends/Sent";
import Home from "./components/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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