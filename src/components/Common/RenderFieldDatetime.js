
import React, { PropTypes } from 'react'
import Flatpickr from 'react-flatpickr'
import {
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'

import '../../../node_modules/flatpickr/dist/flatpickr.min.css'

const RenderFieldDatetime = ({
  input: { onChange, value },
  label,
  meta: { touched, error, warning, valid }
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
        <Flatpickr className={'form-control'}
                   data-enable-time
                   data-week-numbers
                   data-minute-increment={1}
                   onChange={v => onChange(v[0])}
                   value={value} />
        <FormControl.Feedback />
        {touched && (
          (error && <HelpBlock>{error}</HelpBlock>) ||
          (warning && <HelpBlock>{warning}</HelpBlock>))}
      </Col>
    </FormGroup>
  )
}

RenderFieldDatetime.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export default RenderFieldDatetime
