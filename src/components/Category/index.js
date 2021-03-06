import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export class Category extends Component {
  render() {
    const { category } = this.props
    return (
      <Link to={`/categories/${category.id}`}
            className="list-group-item">
        <h4 className="list-group-item-heading truncate">
          {category.name}
        </h4>
        {category.description && <p className="list-group-item-text truncate">
          {category.description}
        </p>}
      </Link>
    )
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
}

export default Category
