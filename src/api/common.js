import axios from 'axios'

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || 'http://localhost:3000/'
export const API_URL = `${PUBLIC_URL}api/`

export const getToken = () => localStorage.getItem('token')

const addAuthToken = (token) => ({
  'Authorization': `Bearer ${token}`
})

export const resource = (url, formatParamsToSend) => ({
  fetchAll: ({ page, limit, ids, customQuery }) => axios
    .get(url, {
      params: {
        page,
        limit,
        ids,
        customQuery
      },
      headers: {
        ...addAuthToken(getToken())
      }
    }),
  fetchOne: (id) => axios
    .get(`${url}/${id}`, {
      headers: {
        ...addAuthToken(getToken())
      }
    }),
  create: params => axios({
    url: url,
    method: 'post',
    headers: {
      ...addAuthToken(getToken())
    },
    data: formatParamsToSend(params)
  }),
  undate: (id, params) => axios({
    url: `${url}/${id}`,
    method: 'put',
    headers: {
      ...addAuthToken(getToken())
    },
    data: formatParamsToSend(params)
  }),
  del: id => axios({
    url: `${url}/${id}`,
    method: 'delete',
    headers: {
      ...addAuthToken(getToken())
    }
  })
})
