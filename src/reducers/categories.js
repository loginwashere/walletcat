import { createReducer } from 'redux-act'
import * as categoriesActions from '../actions/categories'
import * as authActions from '../actions/auth'
import { categoriesPaginator } from './pagination'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

export const categories = createReducer({
  [categoriesActions.invalidateCategories]: state => ({
    ...state,
    didInvalidate: true
  }),
  [categoriesActions.fetchCategoriesRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [categoriesActions.fetchCategoriesSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.categories
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    }
  }),
  [categoriesActions.fetchCategoriesFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [categoriesActions.createCategoryRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [categoriesActions.createCategorySuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: payload.data
    },
  }),
  [categoriesActions.createCategoryFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [categoriesActions.updateCategoryRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [categoriesActions.updateCategorySuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: payload.data
    },
  }),
  [categoriesActions.updateCategoryFailure]: state => ({
    ...state,
    isFetching: false
  }),

  [categoriesActions.deleteCategoryRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [categoriesActions.deleteCategorySuccess]: (state, id) => ({
    ...state,
    isFetching: false,
    items: Object.keys(state.items)
      .filter(key => key !== id)
      .reduce((result, current) => {
        result[current] = state.items[current]
        return result
      }, {}),
  }),
  [categoriesActions.deleteCategoryFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [categoriesPaginator.receivePage]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      ...categoriesPaginator.itemsReducer(state.items, payload)
    }
  }),
  [authActions.logoutSuccess]: () => initialState,
}, initialState)

export default categories
