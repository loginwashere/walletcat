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
import { deleteAgent, fetchAgentsPageWithDependencies } from '../../actions'

export class AgentDelete extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, agentId } = this.props
    dispatch(deleteAgent(agentId))
  }

  render() {
    const { agent } = this.props
    return (
      <div>
        <h1>Delete Category</h1>
        {agent &&
          <Form horizontal
                onSubmit={this.handleSubmit}>
            <Col sm={12}>
              <Alert bsStyle="warning">
                Are you  sure you want to delete agent
                {' '}
                <strong>{agent.name}</strong>?
              </Alert>
            </Col>

            <FormGroup>
              <Col smOffset={2} sm={2} xs={6}>
                <LinkContainer to={`/agents/${agent.id}`}>
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
          </Form>}
      </div>
    )
  }

  componentDidMount() {
    const { dispatch, agentId } = this.props
    dispatch(fetchAgentsPageWithDependencies({ filter: { id: [agentId] } }))
  }
}

AgentDelete.propTypes = {
  agent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  agentId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const agentId = ownProps.params.agentId
  const agent = state.agents.items[agentId]
  return {
    agentId,
    agent
  }
}

export default connect(mapStateToProps)(AgentDelete)
