import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://api.wordnik.com:80/v4`
  })
}
