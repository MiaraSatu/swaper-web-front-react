import axios from "axios"

const BASE_URL = "http://localhost:8080"
const API_URL = BASE_URL+"/api"

const apiFetch = async (url, token) => {
  let response = null
  await axios.get(BASE_URL+url, {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("error by fetch from "+url, error)
  })
  return response
}

const apiCheckMessage = async (token) => {
  let response = null
  await axios.get(API_URL+"/discussions/check", {headers: {Authorization: "bearer "+token}})
  .then(({data}) => {
    response = data
  })
  .catch((error) => {
    console.error("Error when checking message count", error)
  })
  return response
}

const apiImageUrl = (url) => {
  return BASE_URL+url
}

export {BASE_URL, API_URL, apiFetch, apiImageUrl, apiCheckMessage}