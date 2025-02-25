import useProfile from "../../hooks/useProfile"
import DiscussionItem from "../discussions/DiscussionItem"

const DiscussionsOverview = () => {
  const {discussions} = useProfile()

  return <div>
    {discussions 
      ? <div className="">
          {discussions.map(discussion => <DiscussionItem discussion={discussion} />  )}
        </div>
      : <></>
    }
  </div>
}

export default DiscussionsOverview