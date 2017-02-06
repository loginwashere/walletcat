import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import {
  fetchAppCurrenciesPageWithDependencies,
  fetchAgentsPageWithDependencies
} from '../../actions'
import { accountSchema } from '../../../common/validation'
import {
  WalletFormHeader,
  CreateFormButtonsGroup,
  getValidate
} from '../Common'
import AccountFormFields from '../AccountFormFields'

export class AccountCreateForm extends Component {
  prepareUserCurrenciesOptions = result => {
    const options = result.userCurrencies
      .map(userCurrency => {
        const currency = result.currencies.filter(currency => currency.id === userCurrency.currencyId)[0]
        if (userCurrency && currency) {
          return { value: userCurrency.id, label: currency.name }
        }
      })
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

  loadAgentsOptions = value => {
    const { dispatch } = this.props
    return dispatch(fetchAgentsPageWithDependencies({ filter: { name: value } }))
      .then(this.prepareAgentsOptions)
  }

  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid
    } = this.props

    return (
      <Form horizontal
            onSubmit={handleSubmit}>
        <WalletFormHeader error={error}>New Account</WalletFormHeader>

        <AccountFormFields type="create"
                           loadUserCurrenciesOptions={this.loadUserCurrenciesOptions}
                           loadAgentsOptions={this.loadAgentsOptions}/>

        <CreateFormButtonsGroup cancelTo="/accounts"
                                submitting={submitting}
                                pristine={pristine}
                                reset={reset}
                                invalid={invalid}
                                error={error} />
      </Form>
    )
  }
}

AccountCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  dispatch: PropTypes.func
}

export default reduxForm({
  form: 'accountCreate',
  validate: values => getValidate(values, accountSchema)
})(AccountCreateForm)
