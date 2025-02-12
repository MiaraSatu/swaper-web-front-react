import { createBrowserRouter, Link, Navigate, Outlet } from "react-router-dom";
import Discussions from "./components/Discussions";
import LeftBar from "./components/LeftBar";
import Friends from "./components/Friends";
import Received from "./components/friends/Received";
import Sent from "./components/friends/Sent";
import Home from "./components/Home";
import Suggestions from "./components/friends/Suggestions";
import Invitations from "./components/friends/Invitations";
import { DiscussionContextProvider } from "./hooks/useDiscussions";
import { FriendsContextProvider } from "./hooks/useFriends";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: ":discussion_id?",
        element: <DiscussionContextProvider>
          <Discussions />
        </DiscussionContextProvider>
      },
      {
        path: "friends",
        element: <FriendsContextProvider>
          <Friends />
        </FriendsContextProvider>,
        children: [
          {index: true, element: <Navigate to="suggestions" replace />},
          {
            path: "suggestions",
            element: <Suggestions />
          },
          {
            path: "requests",
            element: <Invitations />,
            children: [
              {index: true, element: <Navigate to="received" replace />},
              {
                path: "received",
                element: <Received />
              },
              {
                path: "sent",
                element: <Sent />
              }
            ]
          },
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