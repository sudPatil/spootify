import { makeRequest, getToken } from './makeRequest';
import axios from 'axios';

const playLists = async () => {
  const result = await makeRequest('featured-playlists')
  return result.data.playlists
}

const getNextPlayLists = async (url) => {
  const result = await axios.get(url,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )
  return result.data.playlists
}


export { getNextPlayLists, playLists }