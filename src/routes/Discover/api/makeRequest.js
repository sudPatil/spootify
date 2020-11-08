import axios from 'axios';
import qs from 'querystring';
import config from '../../../config';

const { api } = config;

export const getToken = () => sessionStorage.getItem(api.clientId)

export async function makeRequest(path, queryOptions) {
  if (!getToken()) {
    const { data: { access_token: token } } = await axios.post(
      api.authUrl,
      qs.stringify({ 'grant_type': 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${api.clientId}:${api.clientSecret}`)}`
        }
      }
    );
    sessionStorage.setItem(api.clientId, token)
  }

  const res = await axios.get(
    `${api.baseUrl}/browse/${path}?locale=en_US`,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );

  return res;
}
