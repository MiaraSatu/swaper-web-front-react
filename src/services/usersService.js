import axios from "axios"
import { API_URL } from "./api"

async function fetchBestFriends(token) {
  let friends = null
  await axios.get(API_URL+"/users/discussers", {
    headers: {
      'Content-Type': 'application/json',
      Authorization: "bearer "+token
    }
  }).then(({data}) => {
    friends = data
  }).catch((error) => {
    console.error("error by fetching best friends:", error)
  })
  return friends
}

async function fetchPaginedFriends(userId, token) {
  let response = null
  await axios.get(API_URL+"/users/"+userId+"/friends", {
    headers: {
      Authorization: "bearer "+token
    }
  }).then(({data}) => {
    response = data
  }).catch((error) => {
    console.error("error by fetching friends", error)
  })
  return response
}

async function fetchPaginedInvitations(filter, token) {
  let response = null
  await axios.get(API_URL+"/invitations/"+filter, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when fetching received invitations :", error)
  })
  return response
}

async function fetchPaginedSuggestions(token) {
  let response = null
  await axios.get(API_URL+"/users/suggestions", {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when fetching suggestions ", error)
  })
  return response
}

async function inviteFriend(userId, message, token) {
  let response = null
  await axios.post(API_URL+"/user/"+userId+"/invite", message, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when sending invitation")
  })
  return response
}

async function acceptInvitation(invitationId, token) {
  let response = null
  await axios.get(API_URL+"/invitation/"+invitationId+"/accept", {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Invitation not accepted", error)
  })
  return response
}

async function refuseInvitation(invitationId, message, token) {
  let response = null
  await axios.post(API_URL+"/invitation/"+invitationId+"/refuse", message, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Invitation not refused", error)
  })
  return response
}

async function cancelInvitation(invitationId, token) {
  let response = null
  await axios.get(API_URL+"/invitation/"+invitationId+"/cancel", {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Invitation not canceled", error)
  })
  return response
}

const usersService = {fetchBestFriends, fetchPaginedFriends, fetchPaginedInvitations, fetchPaginedSuggestions, inviteFriend,
  acceptInvitation, refuseInvitation, cancelInvitation
}

export default usersService