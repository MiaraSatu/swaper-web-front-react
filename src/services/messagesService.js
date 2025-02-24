import axios from "axios"
import { API_URL } from "./api"

async function fetchDiscussions(token) {
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

async function fetchDiscussion(id, token, isBox = false) {
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

async function fetchMessages(exchangerId, token, type = "sample") {
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

async function sendMessage(message, type, receivedId, token, replyTo = null) {
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

async function createBox(box, token) {
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

async function addBoxMember(boxId, members, token) {
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

export const messagesService = {fetchDiscussions, fetchDiscussion, fetchMessages, sendMessage, createBox, addBoxMember}