import { makeRequest, getToken } from './makeRequest';
import axios from 'axios';

const getCategories = async () => {
  const result = await makeRequest('categories')
  return result.data.categories
}

const getNextCategories = async (url) => {
  const result = await axios.get(url,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )
  return result.data.categories
}


export { getCategories, getNextCategories }