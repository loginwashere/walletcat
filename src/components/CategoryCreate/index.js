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
    return (
      <CategoryCreateForm onSubmit={this.handleSubmit} />
    )
  }
}

CategoryCreate.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(CategoryCreate)
