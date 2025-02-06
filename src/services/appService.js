function getDiscussionSubject(discussion, user) {
  if(!discussion) return null
  return (discussion.type == "sample") 
      ? (discussion.sender.id == user.id ? discussion.receiver : discussion.sender) 
      : discussion.boxReceiver
}

export const appService = {
  getDiscussionSubject
}