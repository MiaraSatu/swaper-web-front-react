import { DiscussionContextProvider } from "../hooks/useDiscussions"
import Discussion from "./discussions/Discussion"
import RightDiscussions from "./discussions/RightDiscussions"

const Discussions = () => {

  return <DiscussionContextProvider>
    <div className="w-full h-full flex">
      <div className="w-3/4 bg-gray-50">
        <Discussion />
      </div>
      <div id="discussions" className="w-1/4 py-4 px-8">
        <RightDiscussions />
      </div>
    </div>
  </DiscussionContextProvider>
}

export default Discussions