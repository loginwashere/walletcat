
import React, { PropTypes } from 'react'
import Flatpickr from 'react-flatpickr'
import WalletFormGroup from './WalletFormGroup'

import '../../../node_modules/flatpickr/dist/flatpickr.min.css'

const handleOnChange = onChange => v => onChange(v[0])

const RenderFieldDatetime = ({
  input: { name, onChange, value },
  label,
  meta,
  labelColProps,
  valueColProps
}) => (
  <WalletFormGroup name={name}
                   label={label}
                   meta={meta}
                   labelColProps={labelColProps}
                   valueColProps={valueColProps}>
      <Flatpickr className={'form-control'}
                  data-enable-time
                  data-week-numbers
                  data-minute-increment={1}
                  onChange={handleOnChange(onChange)}
                  value={value} />
  </WalletFormGroup>
)

RenderFieldDatetime.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  labelColProps: PropTypes.object,
  valueColProps: PropTypes.object
}

export default RenderFieldDatetime
