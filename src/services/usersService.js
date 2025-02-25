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
    console.error("Error when fetching "+filter+" invitations :", error)
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

async function getReceivedInvitation(senderId, token) {
  let response = null
  await axios.get(`${API_URL}/invitation/sender/${senderId}`, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when fetching request sent by "+senderId, error)
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

async function refuseInvitation(invitationId, token) {
  let response = null
  await axios.get(API_URL+"/invitation/"+invitationId+"/refuse", {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Invitation not refused", error)
  })
  return response
}

async function cancelInvitation(id, token, isUserId = false) {
  let response = null
  const url = isUserId ? `${API_URL}/user/${id}/invitation/cancel` : `${API_URL}/invitation/${id}/cancel`
  await axios.get(url, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Invitation not canceled", error)
  })
  return response
}

async function searchFriend(keyword, token) {
  let response = null
  await axios.get(`${API_URL}/users/discussers/search?kw=${keyword}`, {headers: {Authorization: `bearer ${token}`}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error by searching user", error)
  })
  return response
}

async function search(keyword, token) {
  let response = null
  await axios.get(`${API_URL}/users/search?kw=${keyword}`, {headers: {Authorization: `bearer ${token}`}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when searching user", error)
  })
  return response
}

async function removeFriend(friendId, token) {
  let response = null
  await axios.get(`${API_URL}/user/${friendId}/remove`, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when remove friend", error)
  })
  return response
}

async function getUser(userId, token) {
  let response = null
  await axios.get(`${API_URL}/users/${userId}`, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when fetching user", error.response.data)
  })
  return response
}

async function updateUser(user, token) {
  let response = null
  await axios.put(`${API_URL}/users/`, user, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when updating user", error.response.data)
  })
  return response
}

async function updatePicture(formData, token) {
  let response = null
  await axios.post(`${API_URL}/users/picture`, formData, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when updating picture", error.response.data)
  })
  return response
}

const usersService = {fetchBestFriends, fetchPaginedFriends, fetchPaginedInvitations, fetchPaginedSuggestions, getReceivedInvitation, inviteFriend,
  acceptInvitation, refuseInvitation, cancelInvitation, searchFriend, search, removeFriend, getUser, updateUser, updatePicture
}

export default usersService