const InvitationItem = ({invitation, subjectStatus = "receiver"}) => {
  const subject = (subjectStatus == "receiver") ? invitation.receiver : invitation.sender

  return <div className="">
      {subject.name}
  </div>
}

export default InvitationItem