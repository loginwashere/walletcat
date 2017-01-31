import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import CategoriesPage from '../CategoriesPage'
import { WalletPager } from '../Common'
import { fetchCategoriesPageWithDependencies } from '../../actions'

export class Categories extends Component {
  handlePageChange = (page = 1) => {
    const { dispatch } = this.props
    dispatch(fetchCategoriesPageWithDependencies({ page }))
  }

  render() {
    const { categories, page, hasNextPage, pages } = this.props
    return (
      <div>
        <h1>
          Categories
          <LinkContainer to="/categories/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        {page &&
          pages &&
          pages[page] &&
          <CategoriesPage categoryIds={pages[page].ids}
                          categories={categories} />}
        <WalletPager hasPrev={page > 1}
                     hasNext={hasNextPage}
                     page={page}
                     route="/categories"/>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page &&
      (!this.props.pages[nextProps.page] || !this.props.pages[nextProps.page].fetching)
    ) {
      this.handlePageChange(nextProps.page)
    }
  }

  componentDidMount() {
    this.handlePageChange()
  }
}

Categories.propTypes = {
  pages: PropTypes.object,
  categories: PropTypes.object.isRequired,
  page: PropTypes.number,
  hasNextPage: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    items: categories
  }  = state.categories || {
    items: {}
  }
  const pagination = state.pagination.categories

  return {
    categories,
    pages: pagination.pages,
    page: parseInt(ownProps.location.query.page, 10) || 1,
    hasNextPage: pagination.hasNextPage
  }
}

export default connect(mapStateToProps)(Categories)
