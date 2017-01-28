import React, { PropTypes } from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'
import RenderError from './RenderError'

export const RenderFieldWithoutCol = ({
  input, label, type, meta: { touched, error, warning, valid }, required, autoFocus
}) => {
  const validationState = (touched, error, warning) => (touched && (
      (error && 'error') ||
      (warning && 'warning') ||
      (!warning && valid && 'success'))) ||
    null
  return (
    <FormGroup validationState={validationState(touched, error, warning)}>
      <ControlLabel className="sr-only">{label}</ControlLabel>
      <FormControl {...input}
                   required={required}
                   autoFocus={autoFocus}
                   type={type}
                   placeholder={label} />
      <FormControl.Feedback />
      {touched && (
        (error && <RenderError error={error} />) ||
        (warning && <RenderError error={warning} />))}
    </FormGroup>
  )
}

RenderFieldWithoutCol.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    warning: PropTypes.string
  }),
  required: PropTypes.bool,
  autoFocus: PropTypes.bool
}

export default RenderFieldWithoutCol
