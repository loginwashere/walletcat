import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export class Agent extends Component {
  render() {
    const { agent } = this.props
    return (
      <Link to={`/agents/${agent.id}`}
            className="list-group-item">
        <h4 className="list-group-item-heading truncate">
          {agent.name}
        </h4>
        {agent.description && <p className="list-group-item-text truncate">
          {agent.description}
        </p>}
      </Link>
    )
  }
}

Agent.propTypes = {
  agent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
}

export default Agent
