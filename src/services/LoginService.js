import axios from "axios"
import { API_URL, BASE_URL } from "./ApiService"

class LoginService {
    
  getToken = async (credentials) => {
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

  getUser = async (token) => {
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

  apiLogin = async (credentials) => {
    let loginData = {}
    loginData.token = await this.getToken(credentials)
    loginData.user = await this.getUser(loginData.token)
    if(!loginData.token || !loginData.user) 
      return null
    return loginData
  }

  apiRegister = async (userData) => {
    let response = {error: null}
    await axios.post(BASE_URL+"/register", userData, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(({data}) => {
      console.log(data)
    }).catch((error) => {
      response.error = error.response.data
    })
    return response
  }

}

export default new LoginService();