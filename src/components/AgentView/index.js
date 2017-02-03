import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateAgent, fetchAgentsPageWithDependencies } from '../../actions'
import AgentEditForm from '../AgentEditForm'

class AgentView extends Component {
  handleSubmit = (values) => {
    const { dispatch, agentId } = this.props
    return dispatch(updateAgent(agentId, values))
  }

  render() {
    const { agent, initialValues } = this.props
    return (
      agent
        ? <AgentEditForm onSubmit={this.handleSubmit}
                         agent={agent}
                         initialValues={initialValues}
                         enableReinitialize={true} />
        : null
    )
  }

  componentDidMount() {
    const { dispatch, agentId } = this.props
    dispatch(fetchAgentsPageWithDependencies({ filter: { id: [agentId] } }))
  }
}

AgentView.propTypes = {
  agentId: PropTypes.string.isRequired,
  agent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  initialValues: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const agentId = ownProps.params.agentId
  const agent = state.agents.items[agentId]

  return {
    agent,
    agentId,
    initialValues: agent
  }
}

export default connect(mapStateToProps)(AgentView)
