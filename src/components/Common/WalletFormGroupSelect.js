import React, { PropTypes } from 'react'
import WalletFormGroup from './WalletFormGroup'
import WalletSelect from './WalletSelect'

const WalletFormGroupSelect = ({
  input,
  label,
  meta,
  loadOptions,
  required,
  autoFocus,
  disabled,
  autoload,
  labelColProps,
  valueColProps
}) => (
  <WalletFormGroup name={input.name}
                   label={label}
                   meta={meta}
                   labelColProps={labelColProps}
                   valueColProps={valueColProps} >
    <WalletSelect
      input={input}
      label={label}
      loadOptions={loadOptions}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
      placeholder={label}
      autoload={autoload}
    />
  </WalletFormGroup>
)

WalletFormGroupSelect.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  loadOptions: PropTypes.func,
  disabled: PropTypes.bool,
  autoload: PropTypes.bool,
  labelColProps: PropTypes.object,
  valueColProps: PropTypes.object
}

export default WalletFormGroupSelect
