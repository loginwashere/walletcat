import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateCategory, fetchCategoriesPageWithDependencies } from '../../actions'
import CategoryEditForm from '../CategoryEditForm'

class CategoryView extends Component {
  handleSubmit = (values) => {
    const { dispatch, category: { id } } = this.props
    dispatch(updateCategory(id, values))
  }

  render() {
    const { category, initialValues } = this.props
    return (
      <CategoryEditForm onSubmit={this.handleSubmit}
                          category={category}
                          initialValues={initialValues}
                          enableReinitialize={true} />
    )
  }

  componentDidMount() {
    const { dispatch, category } = this.props
    dispatch(fetchCategoriesPageWithDependencies({ ids: [category.id] }))
  }
}

CategoryView.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  initialValues: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const category = state.categories.items[ownProps.params.categoryId] || {}

  return {
    category,
    initialValues: category
  }
}

export default connect(mapStateToProps)(CategoryView)
