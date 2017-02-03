import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AgentsPage from '../AgentsPage'
import { WalletPager } from '../Common'
import { fetchAgentsPageWithDependencies } from '../../actions'

export class Categories extends Component {
  handlePageChange = (page = 1) => {
    const { dispatch } = this.props
    dispatch(fetchAgentsPageWithDependencies({ page }))
  }

  render() {
    const { agents, page, hasNextPage, pages } = this.props
    return (
      <div>
        <h1>
          Agents
          <LinkContainer to="/agents/create">
            <Button className="pull-right">Create</Button>
          </LinkContainer>
        </h1>
        {page &&
          pages &&
          pages[page] &&
          <AgentsPage agentIds={pages[page].ids}
                      agents={agents} />}
        <WalletPager hasPrev={page > 1}
                     hasNext={hasNextPage}
                     page={page}
                     route="/agents"/>
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
    this.handlePageChange(this.props.page)
  }
}

Categories.propTypes = {
  pages: PropTypes.object,
  agents: PropTypes.object.isRequired,
  page: PropTypes.number,
  hasNextPage: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    items: agents
  }  = state.agents || {
    items: {}
  }
  const pagination = state.pagination.agents

  return {
    agents,
    pages: pagination.pages,
    page: parseInt(ownProps.location.query.page, 10) || 1,
    hasNextPage: pagination.hasNextPage
  }
}

export default connect(mapStateToProps)(Categories)
