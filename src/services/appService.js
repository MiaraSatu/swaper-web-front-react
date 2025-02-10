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

export const appService = {
  getDiscussionSubject,
  mergeDuplicated
}