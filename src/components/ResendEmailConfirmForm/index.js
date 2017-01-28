import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  FormGroup,
  Col,
  Button,
  FormControl,
  Row
} from 'react-bootstrap'
import { resendEmailConfirmSchema } from '../../../common/validation'
import {
  RenderFieldWithoutCol,
  RenderError,
  getValidate
} from '../Common'

const validate = values => getValidate(values, resendEmailConfirmSchema)

export class ResendEmailConfirmForm extends Component {
  render() {
    const {
      error,
      handleSubmit,
      submitting,
      invalid
    } = this.props
    const validationState = (error) => ((error) && 'error') || null
    return (
      <Form inline
            onSubmit={handleSubmit}>
        <Row>
          <Col sm={12} xs={12}>
            <FormGroup validationState={validationState(error)}>
              <h2>Request another confirmation email</h2>
              <FormControl.Feedback />
              <RenderError error={error} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={3} xs={12}>
              <Field name="email"
                     type="email"
                     component={RenderFieldWithoutCol}
                     label="email@mail.com"/>
          </Col>
          <Col sm={3} xs={12}>
            <Button type="submit"
                    bsStyle="info"
                    disabled={submitting || (!error && invalid)}>
              Request another confirmation email
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

ResendEmailConfirmForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'resendEmailConfirm',
  validate
})(ResendEmailConfirmForm)
