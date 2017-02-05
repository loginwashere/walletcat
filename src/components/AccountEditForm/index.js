import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import { accountSchema } from '../../../common/validation'
import {
  fetchAppCurrenciesPageWithDependencies,
  fetchAgentsPageWithDependencies
} from '../../actions'
import {
  WalletFormHeader,
  EditFormButtonsGroup,
  getValidate
} from '../Common'
import AccountFormFields from '../AccountFormFields'

class AccountEditForm extends Component {
  prepareUserCurrenciesOptions = result => {
    const { customInitialValues } = this.props
    const options = result.userCurrencies
      .map(userCurrency => {
        const currency = result.currencies.filter(currency => currency.id === userCurrency.currencyId)[0]
        if (userCurrency && currency) {
          return { value: userCurrency.id, label: currency.name }
        }
      })
      .filter(Boolean)
      .filter(option => option.label !== customInitialValues.currencyId.label)
      .concat(customInitialValues && customInitialValues.currencyId && [customInitialValues.currencyId])
      .filter(Boolean)
    return { options }
  }

  loadUserCurrenciesOptions = value => {
    const { dispatch } = this.props
    return dispatch(fetchAppCurrenciesPageWithDependencies({ filter: { name: value } }))
      .then(this.prepareUserCurrenciesOptions)
  }

  prepareAgentsOptions = result => {
    const options = result.agents
      .map(agent => ({ value: agent.id, label: agent.name }))
      .filter(Boolean)
    return { options }
  }

  loadAgentsOptions = (value) => {
    const { dispatch } = this.props
    return dispatch(fetchAgentsPageWithDependencies({ filter: { name: value } }))
      .then(this.prepareAgentsOptions)
  }

  render() {
    const {
      error,
      handleSubmit,
      account,
      pristine,
      submitting,
      reset,
      invalid,
      customInitialValues
    } = this.props
    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <WalletFormHeader error={error}>Account {account.name}</WalletFormHeader>

        <AccountFormFields type="edit"
                           customInitialValues={customInitialValues}
                           loadUserCurrenciesOptions={this.loadUserCurrenciesOptions}
                           loadAgentsOptions={this.loadAgentsOptions}/>

        <EditFormButtonsGroup cancelTo="/accounts"
                              deleteTo={`/accounts/${account.id}/delete`}
                              submitting={submitting}
                              pristine={pristine}
                              reset={reset}
                              invalid={invalid}
                              error={error}/>
      </Form>
    )
  }
}

AccountEditForm.propTypes = {
  initialValues: PropTypes.object,
  customInitialValues: PropTypes.object,
  account: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}
export default reduxForm({
  form: 'accountEdit',
  validate: values => getValidate(values, accountSchema)
})(AccountEditForm)
