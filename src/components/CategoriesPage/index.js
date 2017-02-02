import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Category } from '..'

const CategoriesPage = ({ categoryIds, categories }) => (
  <ListGroup>
    {categoryIds.map(id => {
      const category = categories[id]
      return (
        category &&
          <Category key={category.id}
                    category={category} />
      )
    })}
  </ListGroup>
)

CategoriesPage.propTypes = {
  categoryIds: PropTypes.array.isRequired,
  categories: PropTypes.object.isRequired
}

export default CategoriesPage
