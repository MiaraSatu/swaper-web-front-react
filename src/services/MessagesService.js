import axios from "axios"
import { API_URL } from "./ApiService"

class MessageService {  
  fetchDiscussions = async (token) => {
    let response = null
    await axios.get(API_URL+"/discussions", {headers: {Authorization: "bearer "+token}})
    .then(({data}) => {
      response = data
    })
    .catch((error) => {
      console.error("Error when fetching discussions", error)
    })
    return response
  }

  fetchDiscussion = async (id, token, isBox = false) => {
    let response = null
    await axios.get(`${API_URL}/discussion/${id}/${isBox ? "1" : "0"}`, {headers: {Authorization: "bearer "+token}})
    .then(({data}) => {
      response = data
    })
    .catch((error) => {
      console.error("Error when fetching discussion", error)
    })
    return response
  }

  fetchMessages = async (exchangerId, token, type = "sample") => {
    let response = null
    await axios.get(API_URL+"/messages/"+exchangerId+"/"+(type == "sample" ? "0" : "1"), {headers: {Authorization: "bearer "+token}})
    .then(({data}) => {
      response = data
    })
    .catch((error) => {
      console.error("Error when fetching messages ", error)
    })
    return response
  }

  sendMessage = async (message, type, receivedId, token, replyTo = null) => {
    let response = null
    await axios.post(API_URL+"/message/"+receivedId+"/"+(type == "sample" ? "0" : "1")+(replyTo ? "?replyTo="+replyTo : ""), message, {headers: {Authorization: "bearer "+token}})
    .then(({data}) => {
      response = data
    })
    .catch((error) => {
      console.error("Error when sending message ", error)
    })
    return response
  }

  createBox = async (box, token) => {
    let response = null
    await axios.post(`${API_URL}/box`, box, {headers: {Authorization: "bearer "+token}})
    .then(({data}) => {
      response = data
    })
    .catch((error) => {
      console.error("Error when creating box", error)
    })
    return response
  } 

  addBoxMember = async (boxId, members, token) => {
    const membersArray = [...members.map(member => member.id)]
    let response = null
    await axios.post(`${API_URL}/box/${boxId}/users`, membersArray, {headers: {Authorization: "bearer "+token}})
    .then(({data}) => {
      response = data
    })
    .catch((error) => {
      console.error("Error when adding member to a box", error.data.message)
    })
    return response;
  }

}

export default new MessageService();