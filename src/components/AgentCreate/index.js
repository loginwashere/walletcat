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
    return (
      <AgentCreateForm onSubmit={this.handleSubmit} />
    )
  }
}

AgentCreate.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(AgentCreate)
