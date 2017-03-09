import { createAction } from 'redux-act'
import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { categoriesPaginator } from '../../reducers/pagination'
import { PROJECT_ID } from '../../config'

export const invalidateCategories = createAction(`${PROJECT_ID}__CATEGORY_LIST__INVALIDATE`)

export const fetchCategoriesRequest = createAction(`${PROJECT_ID}__CATEGORY_LIST__REQUEST`)
export const fetchCategoriesSuccess = createAction(`${PROJECT_ID}__CATEGORY_LIST__SUCCESS`)
export const fetchCategoriesFailure = createAction(`${PROJECT_ID}__CATEGORY_LIST__FAILURE`)

const fetchCategoriesPage = ({ page, limit }) => dispatch => {
  dispatch(categoriesPaginator.requestPage(page, limit))
  return api.categories
    .fetchAll({ page, limit })
    .then(response => {
      dispatch(
        categoriesPaginator.receivePage(
          response.data.meta.page,
          response.data.meta.limit,
          response.data.meta.hasNextPage,
          response.data.categories
        )
      )
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchCategoriesFailure(error))
      dispatch(alertAdd(error))
    })
}

const fetchCategoriesFilter = (filter) => dispatch => {
  dispatch(fetchCategoriesRequest())
  return api.categories
    .fetchAll({ filter })
    .then(response => {
      dispatch(fetchCategoriesSuccess({ data: response.data }))
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchCategoriesFailure(error))
      dispatch(alertAdd(error))
    })
}

const shouldFetchCategories = ({
  categories: { isFetching, didInvalidate },
  pagination: { categories: { currentPage } }
}, page, filter) => {
  if (filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchCategoriesIfNeeded = ({ page, limit, filter }) => (dispatch, getState) => {
  if (shouldFetchCategories(getState(), page, filter)) {
    return filter
      ? dispatch(fetchCategoriesFilter(filter))
      : dispatch(fetchCategoriesPage({ page, limit }))
  } else {
    return Promise.resolve()
  }
}

export const createCategoryRequest = createAction(`${PROJECT_ID}__CATEGORY_CREATE__REQUEST`)
export const createCategorySuccess = createAction(`${PROJECT_ID}__CATEGORY_CREATE__SUCCESS`)
export const createCategoryFailure = createAction(`${PROJECT_ID}__CATEGORY_CREATE__FAILURE`)

export const createCategory = params => dispatch => {
  dispatch(createCategoryRequest(params))
  return api.categories
    .create(params)
    .then(response => {
      dispatch(createCategorySuccess({ data: response.data }))
      dispatch(invalidateCategories())
      dispatch(push('/categories'))
    })
    .catch(error => {
      dispatch(createCategoryFailure(error))
      throw new SubmissionError(convertError(error))
    })
}

export const deleteCategoryRequest = createAction(`${PROJECT_ID}__CATEGORY_DELETE__REQUEST`)
export const deleteCategorySuccess = createAction(`${PROJECT_ID}__CATEGORY_DELETE__SUCCESS`)
export const deleteCategoryFailure = createAction(`${PROJECT_ID}__CATEGORY_DELETE__FAILURE`)

export const deleteCategory = id => dispatch => {
  dispatch(deleteCategoryRequest(id))
  return api.categories
    .del(id)
    .then(() => {
      dispatch(deleteCategorySuccess(id))
      dispatch(invalidateCategories())
      dispatch(push('/categories'))
    })
    .catch(error => {
      dispatch(deleteCategoryFailure(error))
      dispatch(alertAdd(error))
    })
}

export const updateCategoryRequest = createAction(`${PROJECT_ID}__CATEGORY_UPDATE__REQUEST`)
export const updateCategorySuccess = createAction(`${PROJECT_ID}__CATEGORY_UPDATE__SUCCESS`)
export const updateCategoryFailure = createAction(`${PROJECT_ID}__CATEGORY_UPDATE__FAILURE`)

export const updateCategory = (id, params) => dispatch => {
  dispatch(updateCategoryRequest({ id, params }))
  return api.categories
    .update(id, params)
    .then(response => {
      dispatch(updateCategorySuccess({ data: response.data }))
      dispatch(push('/categories'))
    })
    .catch(error => {
      dispatch(updateCategoryFailure(error))
      throw new SubmissionError(convertError(error))
    })
}
