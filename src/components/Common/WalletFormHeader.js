import React, { PropTypes } from 'react'
import {
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { RenderError, formValidationState } from '../Common'

const WalletFormHeader = ({ error, children }) => (
  <FormGroup validationState={formValidationState(error)}>
    <h1 className="truncate">{children}</h1>
    <FormControl.Feedback />
    <RenderError error={error} />
  </FormGroup>
)

WalletFormHeader.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

export default WalletFormHeader