import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import {
  RenderField,
  WalletFormGroupSelect,
  RenderFieldDatetime
} from '../Common'

const AccountFormFields = ({
  type,
  customInitialValues,
  loadFromAccountOptions,
  loadToAccountOptions,
  loadCategoriesOptions
}) => (
  <div>
    {(type === 'create' || customInitialValues) &&
      <Field required={true}
             name="fromAccountId"
             component={WalletFormGroupSelect}
             label="From Account"
             loadOptions={loadFromAccountOptions} />}
    {(type === 'create' || customInitialValues) &&
      <Field required={true}
             name="toAccountId"
             component={WalletFormGroupSelect}
             label="To Account"
             loadOptions={loadToAccountOptions} />}
    <Field required={true}
           name="fromAmount"
           component={RenderField}
           label="From Amount"
           type="number" />
    <Field required={true}
           name="toAmount"
           component={RenderField}
           label="To Amount"
           type="number" />
    <Field required={true}
           name="fromRate"
           component={RenderField}
           label="From Rate"
           type="number" />
    <Field required={true}
           name="toRate"
           component={RenderField}
           label="To Rate"
           type="number" />
    <Field required={true}
           name="date"
           component={RenderFieldDatetime}
           label="Date"
           type="text" />
    {(type === 'create' || customInitialValues) &&
      <Field required={true}
             name="categoryId"
             component={WalletFormGroupSelect}
             label="Category"
             loadOptions={loadCategoriesOptions} />}
    <Field name="description"
           component={RenderField}
           label="Description"
           type="text" />
  </div>
)

AccountFormFields.propTypes = {
  type: PropTypes.string.isRequired,
  customInitialValues: PropTypes.object,
  loadFromAccountOptions: PropTypes.func.isRequired,
  loadToAccountOptions: PropTypes.func.isRequired,
  loadCategoriesOptions: PropTypes.func.isRequired
}

export default AccountFormFields