import { Outlet } from "react-router-dom"
import Discussion from "./discussions/Discussion"
import RightDiscussions from "./discussions/RightDiscussions"

const Discussions = () => {

  return <div className="w-full h-full flex">
    <div className="w-3/4 bg-gray-50">
      <Outlet />
    </div>
    <div id="discussions" className="w-1/4 py-4 pr-8 pl-4">
      <RightDiscussions />
    </div>
  </div>
}

export default Discussions