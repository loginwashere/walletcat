import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Category from '../Category/Category';
import { fetchCategoriesIfNeeded } from '../../actions';

export class Categories extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div>
        <h1>Categories</h1>
        <ListGroup>
          {categories.map(category => {
            return (
              <Category key={category.id}
                        category={category} />
            );
          })}
        </ListGroup>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: categories
  }  = state.categories || {
    isFetching: true,
    items: []
  }

  return {
    isFetching,
    lastUpdated,
    categories
  };
}

export default connect(mapStateToProps)(Categories);
