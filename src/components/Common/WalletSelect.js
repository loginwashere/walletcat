import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

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
      loadOptions,
      required,
      autoFocus,
      disabled,
      autoload
    } = this.props
    return (
      <Select.Async
        name={input.name}
        value={input.value}
        loadOptions={loadOptions}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        placeholder={label}
        autoload={autoload}
        onChange={this.onChange(input)}
        onBlur={this.onBlur(input)}
      />
    )
  }
}

WalletSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  loadOptions: PropTypes.func,
  disabled: PropTypes.bool,
  autoload: PropTypes.bool
}

export default WalletSelect
