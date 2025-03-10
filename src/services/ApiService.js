import axios from "axios"

export const BASE_URL = "http://localhost:8080"
export const API_URL = BASE_URL+"/api"

class ApiService {

  fetch = async (url, token) => {
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

  imageUrl = (url) => {
    return BASE_URL+url
  }
}

export default new ApiService();