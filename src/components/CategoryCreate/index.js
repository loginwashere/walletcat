import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CategoryCreateForm from '../CategoryCreateForm'
import { createCategory } from '../../actions'

export class CategoryCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createCategory(values))
  }

  render() {
    const { currentPage } = this.props
    return (
      <CategoryCreateForm onSubmit={this.handleSubmit}
                          currentPage={currentPage} />
    )
  }
}

CategoryCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const currentPage = state.pagination.categories.currentPage || 1
  return {
    currentPage
  }
}

export default connect(mapStateToProps)(CategoryCreate)
