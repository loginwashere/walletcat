import React, { PropTypes } from 'react'
import {
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap'
import RenderError from './RenderError'

const RenderField = ({
  input, label, type, meta: { touched, error, warning, valid }, required, autoFocus
}) => {
  const validationState = (touched, error, warning) => (touched && (
      (error && 'error') ||
      (warning && 'warning') ||
      (!warning && valid && 'success'))) ||
    null
  return (
    <FormGroup controlId="formHorizontalName"
               validationState={validationState(touched, error, warning)}>
      <Col componentClass={ControlLabel} sm={2}>{label}</Col>
      <Col sm={10}>
        <FormControl {...input}
                     required={required}
                     autoFocus={autoFocus}
                     type={type}
                     placeholder={label} />
        <FormControl.Feedback />
        {touched && (
          (error && <RenderError error={error} />) ||
          (warning && <RenderError error={warning} />))}
      </Col>
    </FormGroup>
  )
}

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }),
  required: PropTypes.bool,
  autoFocus: PropTypes.bool
}

export default RenderField
