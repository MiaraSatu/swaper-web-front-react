import { createBrowserRouter, Link, Outlet } from "react-router-dom";
import Discussions from "./components/Discussions";
import LeftBar from "./components/LeftBar";
import Friends from "./components/Friends";

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
        path: "friends",
        element: <Friends />
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