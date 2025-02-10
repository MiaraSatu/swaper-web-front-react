function getDiscussionSubject(discussion, user) {
  if(!discussion) return null
  return (discussion.type == "sample") 
      ? (discussion.sender.id == user.id ? discussion.receiver : discussion.sender) 
      : discussion.boxReceiver
}

function mergeDuplicated(list) {
  return Object.values(list.reduce((acc, item) => {
    if(acc[item.id]) {
      acc[item.id] = {...acc[item.id], ...item}
    } else {
      acc[item.id] = item
    }
    return acc
  }, {}))
}

export const appService = {
  getDiscussionSubject,
  mergeDuplicated
}