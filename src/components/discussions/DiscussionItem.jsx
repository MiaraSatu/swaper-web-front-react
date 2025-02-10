import { formatDistance } from "date-fns"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { apiImageUrl } from "../../services/api"
import avatar from "../../assets/User_Avatar_2.png"
import useDiscussions from "../../hooks/useDiscussions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { appService } from "../../services/appService"

const DiscussionItem = ({discussion}) => {
  const {user} = useAuth()
  const {setCurrentDiscussion} = useDiscussions()

  const [now, setNow] = useState(new Date())

  const sentAt = Date.parse(discussion.createdAt)
  const subject = appService.getDiscussionSubject(discussion, user)

  useEffect(() => {
    const timeUpdateInterval = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(timeUpdateInterval)
  }, [])

  return <div 
      key={discussion.id+discussion.type}
      className={"discussion-item flex content-between my-2 p-2 rounded cursor-pointer hover:bg-gray-50 hover:shadow"+ (discussion.unreadCount == 0 ? " seen" : " new") }
      onClick={() => setCurrentDiscussion({discussion, subject})}
    >
      <div className="flex w-4/5">
        <img 
          className="w-8 h-8 mr-2 object-cover"
          src={subject.imageUrl ? apiImageUrl(subject.imageUrl) : avatar} 
          alt={subject.name} 
        />
        <div className="w-full text-ellipsis overflow-hidden text-nowrap">
          <div className="text-gray-900">{subject.name}</div>
          <div className="text-xs text-gray-600">{discussion.content}</div>
        </div>
      </div>
      <div className="w-1/5 text-xs text-right text-gray-500 font-semibold">
        {formatDistance(sentAt, now)}
        { discussion.unreadCount > 0 
          ? <div className="flex items-center justify-center ml-auto w-5 h-5 bg-gray-900 text-white rounded-full">
              {discussion.unreadCount}
            </div>
          : <></>
        }
        </div>
  </div>
}

export default DiscussionItem