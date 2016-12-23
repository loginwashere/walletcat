import React, { Component, PropTypes } from 'react';

export default class Category extends Component {
  render() {
    const { category } = this.props;
    return (
      <li className="list-group-item">
        <h4 className="list-group-item-heading">
          {category.name}
        </h4>
        <p className="list-group-item-text">
          {category.description}
        </p>
      </li>
    );
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}
