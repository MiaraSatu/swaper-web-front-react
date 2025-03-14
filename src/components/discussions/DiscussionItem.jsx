import { format, isToday, isYesterday } from "date-fns"
import { useAuth } from "../../hooks/useAuth"
import useDiscussions from "../../hooks/useDiscussions"
import AppService from "../../services/AppService"
import MessageStatus from "./MessageStatus"

const DiscussionItem = ({discussion}) => {
  const {user} = useAuth()
  const {setCurrentDiscussion} = useDiscussions()

  const subject = AppService.getDiscussionSubject(discussion, user)

  const formatDate = (stringDate) => {
    const date = Date.parse(stringDate)
    if(isToday(date)) {
      return format(date, "HH:mm")
    }
    if(isYesterday(date)) {
      return `Yest ${format(date, "HH:mm")}`
    }
    else {
      return format(date, "LLL d, HH:mm")
    }
  }

  return <div 
      key={discussion.id+discussion.type}
      className={"discussion-item flex my-2 p-2 rounded cursor-pointer hover:bg-gray-50 hover:shadow" }
      onClick={() => setCurrentDiscussion(subject)}
    >
      <div className="w-1/5">
        <img 
          className="w-12 h-12 object-cover rounded-full"
          src={AppService.loadImage(subject.imageUrl)} alt={subject.name} 
        />
      </div>
      <div className="w-4/5 pl-1">
        <div className="flex items-center justify-between">
          <div className={"overflow-hidden text-ellipsis text-md box-border" + (discussion.unreadCount > 0 ? " font-semibold" : "")}>
            {subject.name}
          </div>
          <div className="text-xs text-nowrap text-gray-400 ml-1">
            {formatDate(discussion.createdAt)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-500">
            {(discussion.sender.id == user.id ? "You: ": "") + discussion.content}
          </div>
          <div>
            {discussion.unreadCount > 0
              ? <div className="flex items-center justify-center ml-auto w-5 h-5 text-xs bg-gray-900 text-white rounded-full">
                  {discussion.unreadCount}
                </div>
              : <MessageStatus message={discussion} />
            }
          </div>
        </div>
      </div>
  </div>
}

export default DiscussionItem