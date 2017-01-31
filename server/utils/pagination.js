const DEFAULT_LIMIT = 10
const DEFAULT_PAGE = 1

const getPaginationParams = (
  requestQuery,
  { limit, page } = { limit: DEFAULT_LIMIT, page: DEFAULT_PAGE }
) => ({
  limit: requestQuery.limit || limit,
  page: requestQuery.page || page
})

const paginateQuery = ({ limit, page }, query) => Object.assign({}, query, {
  limit: parseInt(limit, 10) + 1,
  offset: (page - 1) * limit
})

const paginateResponse = ({ limit, page }, responseKey, response) => ({
  [responseKey]: response.filter((item, index) => index < limit),
  meta: {
    page: page,
    limit: limit,
    hasNextPage: response.length === parseInt(limit, 10) + 1
  }
})

const paginate = (
  model, requestQuery, query, responseKey = model.getTableName(), method = 'findAll'
) => model[method](paginateQuery(getPaginationParams(requestQuery), query))
  .then(items => paginateResponse(getPaginationParams(requestQuery), responseKey, items))

module.exports = {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,

  getPaginationParams,
  paginateQuery,
  paginateResponse,

  paginate
}
