import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateCategory, fetchCategoriesIfNeeded } from '../../actions';
import CategoryEditForm from '../CategoryEditForm';

class CategoryView extends Component {
  handleSubmit = (values) => {
    const { dispatch, category: { id } } = this.props;
    dispatch(updateCategory(id, values));
  }

  render() {
    const { category, initialValues } = this.props;
    return (
      <div>
        <h1>Category {category.name}</h1>
        <CategoryEditForm onSubmit={this.handleSubmit}
                          category={category}
                          initialValues={initialValues}
                          enableReinitialize={true} />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }
}

CategoryView.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const category = state.categories.items[ownProps.params.categoryId] || {};

  return {
    category,
    initialValues: category
  };
}

CategoryView = connect(mapStateToProps)(CategoryView);

export default CategoryView;
