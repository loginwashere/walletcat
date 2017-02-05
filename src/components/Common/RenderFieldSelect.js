import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import WalletFormGroup from './WalletFormGroup'

const RenderFieldSelect = ({
  input, label, type, meta, options, required, autoFocus
}) => (
  <WalletFormGroup name={input.name}
                   label={label}
                   meta={meta}>
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
  </WalletFormGroup>
)

RenderFieldSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  options: PropTypes.array.isRequired
}

export default RenderFieldSelect