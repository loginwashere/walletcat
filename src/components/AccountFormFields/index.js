import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import {
  RenderField,
  WalletFormGroupSelect
} from '../Common'

const AccountFormFields = ({
  type,
  customInitialValues,
  loadUserCurrenciesOptions,
  loadAgentsOptions
}) => (
  <div>
    <Field required={true}
           name="name"
           component={RenderField}
           label="Name"
           type="text" />
    {(type === 'create' || customInitialValues) &&
      <Field required={true}
             name="currencyId"
             component={WalletFormGroupSelect}
             label="Currency"
             loadOptions={loadUserCurrenciesOptions}
             autoload={true} />}
    {(type === 'create' || customInitialValues) &&
      <Field required={true}
             name="agentId"
             component={WalletFormGroupSelect}
             label="Agent"
             loadOptions={loadAgentsOptions}
             autoload={true} />}
    <Field name="amount"
           component={RenderField}
           label="Amount"
           type="number" />
    <Field name="description"
           component={RenderField}
           label="Description"
           type="text" />
  </div>
)

AccountFormFields.propTypes = {
  type: PropTypes.string.isRequired,
  customInitialValues: PropTypes.object,
  loadUserCurrenciesOptions: PropTypes.func.isRequired,
  loadAgentsOptions: PropTypes.func.isRequired
}

export default AccountFormFields