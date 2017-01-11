import React, { PropTypes } from 'react';
import {
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

export const RenderField = ({
  input, label, type, meta: { touched, error, warning, valid }
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
        <FormControl {...input}
                     type={type}
                     placeholder={label} />
        <FormControl.Feedback />
        {touched && (
          (error && <HelpBlock>{error}</HelpBlock>) ||
          (warning && <HelpBlock>{warning}</HelpBlock>))}
      </Col>
    </FormGroup>
  )
};

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
};

export const RenderFieldSelect = ({
  input, label, type, meta: { touched, error, warning, valid }, options
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

        <FormControl {...input}
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
};

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
};
