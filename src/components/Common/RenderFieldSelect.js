import React, { PropTypes } from 'react'
import {
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'
import { validationState } from '.'

const RenderFieldSelect = ({
  input, label, type, meta: { touched, error, warning, valid }, options, required, autoFocus
}) => (
  <FormGroup controlId="formHorizontalName"
              validationState={validationState(touched, error, warning, valid)}>
    <Col componentClass={ControlLabel} sm={2}>{label}</Col>
    <Col sm={10}>

      <FormControl {...input}
                    required={required}
                    autoFocus={autoFocus}
                    componentClass="select"
                    type={type}
                    placeholder={label} >
        <option value="" key={0}>Select {label}</option>
          {options.map(item => <option value={item.id}
                                        key={item.id}>{item.name}</option>)}
      </FormControl>
      <FormControl.Feedback />
      {touched && (
        (error && <HelpBlock>{error}</HelpBlock>) ||
        (warning && <HelpBlock>{warning}</HelpBlock>))}
    </Col>
  </FormGroup>
)

RenderFieldSelect.propTypes = {
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
  autoFocus: PropTypes.bool,
  options: PropTypes.array.isRequired
}

export default RenderFieldSelect