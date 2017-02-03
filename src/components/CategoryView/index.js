import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateCategory, fetchCategoriesPageWithDependencies } from '../../actions'
import CategoryEditForm from '../CategoryEditForm'

class CategoryView extends Component {
  handleSubmit = (values) => {
    const { dispatch, categoryId } = this.props
    return dispatch(updateCategory(categoryId, values))
  }

  render() {
    const { category, initialValues } = this.props
    return (
      category
        ? <CategoryEditForm onSubmit={this.handleSubmit}
                            category={category}
                            initialValues={initialValues}
                            enableReinitialize={true} />
        : null
    )
  }

  componentDidMount() {
    const { dispatch, categoryId } = this.props
    dispatch(fetchCategoriesPageWithDependencies({ filter: { id: [categoryId] } }))
  }
}

CategoryView.propTypes = {
  categoryId: PropTypes.string.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  initialValues: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const categoryId = ownProps.params.categoryId
  const category = state.categories.items[categoryId]

  return {
    category,
    categoryId,
    initialValues: category
  }
}

export default connect(mapStateToProps)(CategoryView)
