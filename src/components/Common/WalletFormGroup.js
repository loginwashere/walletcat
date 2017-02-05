import React, { PropTypes } from 'react'
import {
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap'
import RenderError from './RenderError'
import { validationState } from '.'

const WalletFormGroup = ({
  name,
  label,
  meta: { touched, error, warning, valid },
  children,
  labelColProps,
  valueColProps
}) => (
  <FormGroup controlId={`form-horizontal-${name}`}
              validationState={validationState(touched, error, warning, valid)}>
    {label && <Col componentClass={ControlLabel} {...labelColProps}>{label}</Col>}
    <Col {...valueColProps}>
      {children}
      <FormControl.Feedback />
      {touched && (
        (error && <RenderError error={error} />) ||
        (warning && <RenderError error={warning} />))}
    </Col>
  </FormGroup>
)

WalletFormGroup.defaultProps = {
  labelColProps: {
    sm: 2
  },
  valueColProps: {
    sm: 10
  }
}

WalletFormGroup.propTypes = {
  name: PropTypes.string.isRequired,
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  labelColProps: PropTypes.object,
  valueColProps: PropTypes.object
}

export default WalletFormGroup
