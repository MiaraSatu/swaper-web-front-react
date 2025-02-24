function getDiscussionSubject(discussion, user) {
  if(!discussion) return null
  return (discussion.type == "sample") 
      ? (discussion.sender.id == user.id ? discussion.receiver : discussion.sender) 
      : discussion.boxReceiver
}

function mergeDuplicated(list) {
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

function getMessageStatus(message) {
  if(!message) return null
  // [sent, ignored, seen]
  if(message.seen) return "seen"
  if(message.checked) return "ignored"
  return "sent"
}

function sliceTextBasedOnMaster(text, master) {
  const tLen = text.length, mLen = master.length
  if(mLen >= 70) return text.substring(0, 70);
  if(tLen > mLen) return text.substring(0, mLen < 20 ? 20 : mLen) +"..."
  return text
}

export const appService = {
  getDiscussionSubject,
  mergeDuplicated,
  getMessageStatus,
  sliceTextBasedOnMaster
}