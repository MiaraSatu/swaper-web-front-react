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

const usersService = {fetchBestFriends}

export default usersService