import axios from "axios"
import { API_URL, BASE_URL } from "./api"

const apiLogin = async (credentials) => {
  let loginData = {}, error = null
  // get token by credentials
  await axios.post(BASE_URL+"/login", {}, {
    'Content-Type': 'application/json',
    auth: {
      username: credentials.username,
      password: credentials.password
    }
  })
  .then(({data}) => {
    loginData.token = data
  })
  .catch((error) => {
    error = error
  })
  if(loginData.token) {
    // get user by token
    await axios.get(API_URL+"/user", {
      headers: {
        Authorization: 'bearer '+loginData.token
      }
    }).then(({data}) => {
      loginData.user = data
    }).catch((error) => {
      console.error("Error appears", error)
    })
  }

  return {loginData, error}
}

const testConnection = () => {
  axios.get(BASE_URL+"/before_start/get_users").catch((error) => {console.error("error negga", error)}).then((response) => {console.log(response)})
}

const loginService = {
  apiLogin,
  testConnection
}

export default loginService