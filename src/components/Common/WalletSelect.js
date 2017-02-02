import React, { Component, PropTypes } from 'react'
import {
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'
import Select from 'react-select'
import { validationState } from '.'

import 'react-select/dist/react-select.css'

class WalletSelect extends Component {
  onChange = input => option => {
    const value = option
      ? option.value
      : ''
    input.onChange(value)
  }

  onBlur = input => () => {
    const value = typeof input.value === 'object'
      ? input.value.value
      : input.value
    input.onBlur(value)
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning, valid },
      options,
      loadOptions,
      required,
      autoFocus,
      disabled,
      autoload
    } = this.props
    const Component = (options && !loadOptions)
      ? Select
      : Select.Async
    return (
      <FormGroup controlId="formHorizontalName"
                validationState={validationState(touched, error, warning, valid)}>
        <Col componentClass={ControlLabel} sm={2}>{label}</Col>
        <Col sm={10}>
          <Component
            name={input.name}
            value={input.value}
            options={options}
            loadOptions={loadOptions}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            placeholder={label}
            autoload={autoload}
            onChange={this.onChange(input)}
            onBlur={this.onBlur(input)}
          />
          <FormControl.Feedback />
          {touched && (
            (error && <HelpBlock>{error}</HelpBlock>) ||
            (warning && <HelpBlock>{warning}</HelpBlock>))}
        </Col>
      </FormGroup>
    )
  }
}

WalletSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
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
  options: PropTypes.array,
  loadOptions: PropTypes.func,
  disabled: PropTypes.bool,
  autoload: PropTypes.bool
}

export default WalletSelect
