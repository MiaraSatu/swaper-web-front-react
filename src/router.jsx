import { createBrowserRouter, Link } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <div>
          Welcome to home page.
          <div className="text-red-500">
            <Link to={{pathname: "about"}}>
              about
            </Link>
          </div>
        </div>
      },
      {
        path: "about",
        element: <div>
          Welcome to the about page
          <div className="text-red-500">
            <Link to={{pathname: "/"}}>Go home</Link>
          </div>
        </div>
      }
    ]
  }
])