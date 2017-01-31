import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Form,
  FormGroup,
  Col,
  Button,
  Alert
} from 'react-bootstrap'
import { deleteCategory, fetchCategoriesPageWithDependencies } from '../../actions'

export class CategoryDelete extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, category: { id } } = this.props
    dispatch(deleteCategory(id))
  }

  render() {
    const { category } = this.props
    return (
      <div>
        <h1>Delete Category</h1>
        <Form horizontal
              onSubmit={this.handleSubmit}>
          <Col sm={12}>
            <Alert bsStyle="warning">
              Are you  sure you want to delete category
              {' '}
              <strong>{category.name}</strong>?
            </Alert>
          </Col>

          <FormGroup>
            <Col smOffset={2} sm={2} xs={6}>
              <LinkContainer to={`/categories/${category.id}`}>
                <Button type="submit">
                  Cancel
                </Button>
              </LinkContainer>
            </Col>
            <Col sm={2} xs={6}>
              <Button type="submit">
                Delete
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }

  componentDidMount() {
    const { dispatch, category } = this.props
    dispatch(fetchCategoriesPageWithDependencies({ ids: [category.id] }))
  }
}

CategoryDelete.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const category = state.categories.items[ownProps.params.categoryId] || {}
  return {
    category
  }
}

export default connect(mapStateToProps)(CategoryDelete)
