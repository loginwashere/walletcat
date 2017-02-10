import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AgentCreateForm from '../AgentCreateForm'
import { createAgent } from '../../actions'

export class AgentCreate extends Component {
  handleSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(createAgent(values))
  }

  render() {
    const { currentPage } = this.props
    return (
      <AgentCreateForm onSubmit={this.handleSubmit}
                       currentPage={currentPage} />
    )
  }
}

AgentCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const currentPage = state.pagination.agents.currentPage || 1
  return {
    currentPage
  }
}

export default connect(mapStateToProps)(AgentCreate)
