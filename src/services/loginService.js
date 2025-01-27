import axios from "axios"
import { API_URL, BASE_URL } from "./api"

async function getToken(credentials) {
  let token = null
  await axios.post(BASE_URL+"/login", {}, {
    'Content-Type': 'application/json',
    auth: {
      username: credentials.username,
      password: credentials.password
    }
  })
  .then(({data}) => {
    token = data
  })
  .catch((error) => {
    console.error("get token error",error)
  })
  return token
}

async function getUser(token) {
  let user = null
  await axios.get(API_URL+"/user", {
    headers: {
      'Content-Type': "application/json",
      Authorization: 'bearer '+token
    }
  }).then(({data}) => {
    user = data
  }).catch((error) => {
    console.error("getting user error", error)
  })
  return user
}

const apiLogin = async (credentials) => {
  let loginData = {}
  loginData.token = await getToken(credentials)
  loginData.user = await getUser(loginData.token)
  if(!loginData.token || !loginData.user) 
    return null
  return loginData
}

const loginService = {
  apiLogin,
}

export default loginService