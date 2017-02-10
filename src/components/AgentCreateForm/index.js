import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import { agentSchema } from '../../../common/validation'
import {
  CreateFormButtonsGroup,
  WalletFormHeader,
  getValidate
} from '../Common'
import AgentFormFields from '../AgentFormFields'

export const AgentCreateForm = ({
  error,
  handleSubmit,
  pristine,
  reset,
  submitting,
  invalid,
  currentPage
}) => (
  <Form horizontal
        onSubmit={handleSubmit}>
    <WalletFormHeader error={error}>New Agent</WalletFormHeader>

    <AgentFormFields />

    <CreateFormButtonsGroup cancelTo={{ pathname: '/agents', query: { page: currentPage } }}
                            submitting={submitting}
                            pristine={pristine}
                            reset={reset}
                            invalid={invalid}
                            error={error} />
  </Form>
)

AgentCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default reduxForm({
  form: 'agentCreate',
  validate: values => getValidate(values, agentSchema)
})(AgentCreateForm)
