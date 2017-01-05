import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Category } from '..';
import { fetchCategoriesIfNeeded } from '../../actions';

export class Categories extends Component {
  render() {
    const { categories, categoryIds } = this.props;
    return (
      <div>
        <h1>
          Categories
          <LinkContainer to="/categories/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        <ListGroup>
          {categoryIds.map(id => {
            const category = categories[id];
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
  categories: PropTypes.object.isRequired,
  categoryIds: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items: categories,
    itemIds: categoryIds
  }  = state.categories || {
    isFetching: true,
    items: {},
    itemIds: []
  }

  return {
    isFetching,
    lastUpdated,
    categories,
    categoryIds
  };
}

export const CategoriesConnected = connect(mapStateToProps)(Categories);

export default CategoriesConnected;
