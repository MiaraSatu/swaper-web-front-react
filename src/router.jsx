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
import Search from "./components/friends/Search";
import { SearchContextProvider } from "./hooks/useSearch";
import Discussion from "./components/discussions/Discussion";
import NewDiscussion from "./components/discussions/NewDiscussion";
import NewBox from "./components/discussions/NewBox";
import Profile from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {index: true, element: <Navigate to={"discussion"} />},
      {
        path: "discussion",
        element: <DiscussionContextProvider>
          <Discussions />
        </DiscussionContextProvider>,
        children: [
          {
            path: ":discussion_id?",
            element: <Discussion />
          },
          {
            path: "new",
            element: <NewDiscussion />
          },
          {
            path: "new_box",
            element: <NewBox />
          }
        ]
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
          {
            path: "search",
            element: <SearchContextProvider>
              <Search />
            </SearchContextProvider>
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
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
])