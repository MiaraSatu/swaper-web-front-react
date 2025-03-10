import avatar from "../assets/User_Avatar_2.png"
import ApiService from "./ApiService"

class AppService {
  getDiscussionSubject = (discussion, user) => {
    if(!discussion) return null
    return (discussion.type == "sample") 
        ? (discussion.sender.id == user.id ? discussion.receiver : discussion.sender) 
        : discussion.boxReceiver
  }

  getDiscussionSubject = (discussion, user) => {
    if(!discussion) return null
    return (discussion.type == "sample") 
        ? (discussion.sender.id == user.id ? discussion.receiver : discussion.sender) 
        : discussion.boxReceiver
  }

  mergeDuplicated = (list) => {
    const map = new Map()
    list.forEach(item => {
      if(map.has(item.id)) {
        map.set(item.id, {...map.get(item.id), ...item})
      } else {
        map.set(item.id, item)
      }
    })
    return Array.from(map.values())
  }

  getMessageStatus = (message) => {
    if(!message) return null
    // [sent, ignored, seen]
    if(message.seen) return "seen"
    if(message.checked) return "ignored"
    return "sent"
  }

  sliceTextBasedOnMaster = (text, master) => {
    const tLen = text.length, mLen = master.length
    if(mLen >= 70) return text.substring(0, 70);
    if(tLen > mLen) return text.substring(0, mLen < 20 ? 20 : mLen) +"..."
    return text
  }

  loadImage = (path) => {
    return path ? ApiService.imageUrl(path) : avatar
  }

}

export default new AppService();

