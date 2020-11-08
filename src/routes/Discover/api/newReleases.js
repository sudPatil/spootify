import { makeRequest, getToken } from './makeRequest';
import axios from 'axios';

const getNewReleases = async () => {
  const result = await makeRequest('new-releases')
  return result.data.albums
}

const getNextReleases = async (url) => {
  const result = await axios.get(url,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )
  return result.data.albums
}

export {
  getNextReleases,
  getNewReleases
}