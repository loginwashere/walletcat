import axios from 'axios'

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || 'http://localhost:3000/'
export const API_URL = `${PUBLIC_URL}api/`

export const getToken = () => localStorage.getItem('token')

const addAuthTokenHeader = (token) => ({
  'Authorization': `Bearer ${token}`
})
const addContentTypeHeader = () => ({
  'Content-Type': 'application/json'
})

const addCommonHeaders = () => ({
  ...addAuthTokenHeader(getToken()),
  ...addContentTypeHeader()
})

const unique = arrArg => arrArg.filter(
  (elem, pos, arr) => arr.indexOf(elem) == pos
)

export const resource = (url, formatParamsToSend) => ({
  fetchAll: ({ page, limit, ids, filter }) => {
    const filterName = filter && Object.keys(filter)[0]
    const filterValue = filter && filterName && filter[filterName]
    return axios
      .get(url, {
        params: {
          page,
          limit,
          ids: ids && unique(ids),
          filterName,
          filterValue
        },
        headers: addCommonHeaders()
      })
  },
  fetchOne: (id) => axios
    .get(`${url}/${id}`, {
      headers: addCommonHeaders()
    }),
  create: params => axios({
    url: url,
    method: 'post',
    headers: addCommonHeaders(),
    data: formatParamsToSend(params)
  }),
  update: (id, params) => axios({
    url: `${url}/${id}`,
    method: 'put',
    headers: addCommonHeaders(),
    data: formatParamsToSend(params)
  }),
  del: id => axios({
    url: `${url}/${id}`,
    method: 'delete',
    headers: addCommonHeaders()
  })
})
