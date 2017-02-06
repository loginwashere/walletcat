import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import { agentSchema } from '../../../common/validation'
import {
  WalletFormHeader,
  EditFormButtonsGroup,
  getValidate
} from '../Common'
import AgentFormFields from '../AgentFormFields'

export const AgentEditForm = ({
  agent,
  error,
  handleSubmit,
  pristine,
  reset,
  submitting,
  invalid
}) => (
  <Form horizontal
        onSubmit={handleSubmit}>
    <WalletFormHeader error={error}>Agent {agent.name}</WalletFormHeader>

    <AgentFormFields />

    <EditFormButtonsGroup cancelTo="/agents"
                          deleteTo={`/agents/${agent.id}/delete`}
                          submitting={submitting}
                          pristine={pristine}
                          reset={reset}
                          invalid={invalid}
                          error={error}/>
  </Form>
)

AgentEditForm.propTypes = {
  agent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'agentEdit',
  validate: values => getValidate(values, agentSchema)
})(AgentEditForm)
