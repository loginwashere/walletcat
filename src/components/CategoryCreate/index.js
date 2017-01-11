import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CategoryCreateForm from '../CategoryCreateForm';
import { createCategory } from '../../actions';

export class CategoryCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(createCategory(values));
  }

  render() {
    return (
      <div>
        <h1>New Category</h1>
        <CategoryCreateForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

CategoryCreate.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

export const CategoryCreateConnected = connect()(CategoryCreate);

export default CategoryCreateConnected;
