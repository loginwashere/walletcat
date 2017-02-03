import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import Agent from '../Agent'

const AgentsPage = ({ agentIds, agents }) => (
  <ListGroup>
    {agentIds.map(id => {
      const agent = agents[id]
      return (
        agent &&
          <Agent key={agent.id}
                 agent={agent} />
      )
    })}
  </ListGroup>
)

AgentsPage.propTypes = {
  agentIds: PropTypes.array.isRequired,
  agents: PropTypes.object.isRequired
}

export default AgentsPage
