import axios from "axios"
import { API_URL } from "./ApiService"

class UserService {
  

  fetchBestFriends = async (token) => {
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

  fetchPaginedFriends = async (userId, token) => {
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

  fetchPaginedInvitations = async (filter, token) => {
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

  fetchPaginedSuggestions = async (token) => {
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

  getReceivedInvitation = async (senderId, token) => {
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

  inviteFriend = async (userId, message, token) => {
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

  acceptInvitation = async (invitationId, token) => {
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

  refuseInvitation = async (invitationId, token) => {
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

  cancelInvitation = async (id, token, isUserId = false) => {
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

  searchFriend = async (keyword, token) => {
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

  search = async (keyword, token) => {
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

  removeFriend = async (friendId, token) => {
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

  getUser = async (userId, token) => {
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

  updateUser = async (user, token) => {
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

  updatePicture = async (formData, token) => {
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
}

export default new UserService();