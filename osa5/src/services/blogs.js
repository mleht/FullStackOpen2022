import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {      
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },          // lisätään kirjautuneen käyttäjän token HTTP-pyynnön Authorization-headeriin.
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async changedBlog => {
  const config = {
    headers: { Authorization: token },          
  }
  // console.log(changedBlog)
  const response = await axios.put(`${baseUrl}/${changedBlog.id}`, changedBlog, config)
  return response.data
}

export default { getAll, setToken, create, update }