import React, { PropTypes } from 'react'
import {
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import Joi from 'joi'
import errorMessages from '../../../server/utils/errorMessages'

import '../../../node_modules/flatpickr/dist/flatpickr.min.css'

export const RenderField = ({
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

RenderField.PropTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export const RenderFieldSelect = ({
  input, label, type, meta: { touched, error, warning, valid }, options, required, autoFocus
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
}

RenderFieldSelect.PropTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export const RenderFieldDatetime = ({
  input: { onChange, value },
  label,
  type,
  meta: { touched, error, warning, valid }
}) => {
  const validationState = (touched, error, warning) => (touched && (
      (error && 'error') ||
      (warning && 'warning') ||
      (!warning && valid && 'success'))) ||
    null;
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

RenderFieldSelect.PropTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export const RenderError = ({error}) => (
  <div>
    {error
      ? ((Array.isArray(error) ? error : [error])
          .map((i, index) => <HelpBlock key={index}>{i}</HelpBlock>))
      : null}
  </div>
)

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

export const getValidate = (values, schema) =>
  errorMessages(Joi.validate(values, schema, { abortEarly:false }))
