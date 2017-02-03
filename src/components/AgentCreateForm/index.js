import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Form,
  FormGroup,
  Col,
  Button,
  FormControl
} from 'react-bootstrap'
import { agentSchema } from '../../../common/validation'
import { RenderField, RenderError, getValidate, formValidationState } from '../Common'

const validate = values => getValidate(values, agentSchema)

export class AgentCreateForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, invalid } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <FormGroup validationState={formValidationState(error)}>
          <h1 className="form-signin-heading">New Agent</h1>
          <FormControl.Feedback />
          <RenderError error={error} />
        </FormGroup>

        <Field required={true}
               name="name"
               component={RenderField}
               label="Name"
               type="text" />

        <Field name="description"
               component={RenderField}
               label="Description"
               type="text" />

        <FormGroup>
          <Col smOffset={2} sm={2} xs={4}>
            <LinkContainer to="/agents">
              <Button disabled={submitting}>
                Cancel
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={2} xs={4}>
            <Button type="submit" disabled={submitting || (!error && invalid)}>
              Create
            </Button>
          </Col>
          <Col sm={2} xs={4}>
            <Button disabled={pristine || submitting}
                    onClick={reset}>
              Clear
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

AgentCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'agentCreate',
  validate
})(AgentCreateForm)
