import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import WalletFormGroup from './WalletFormGroup'

const RenderField = ({
  input, label, type, meta, required, autoFocus
}) => (
  <WalletFormGroup name={input.name}
                   label={label}
                   meta={meta}>
      <FormControl {...input}
                    required={required}
                    autoFocus={autoFocus}
                    type={type}
                    placeholder={label} />
  </WalletFormGroup>
)

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool
}

export default RenderField
