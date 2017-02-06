import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import { categorySchema } from '../../../common/validation'
import {
  WalletFormHeader,
  CreateFormButtonsGroup,
  getValidate
} from '../Common'
import CategoryFormFields from '../CategoryFormFields'

export const CategoryCreateForm = ({
  error,
  handleSubmit,
  pristine,
  reset,
  submitting,
  invalid
}) => (
  <Form horizontal
        onSubmit={handleSubmit}>
    <WalletFormHeader error={error}>New Category</WalletFormHeader>

    <CategoryFormFields />

    <CreateFormButtonsGroup cancelTo="/categories"
                            submitting={submitting}
                            pristine={pristine}
                            reset={reset}
                            invalid={invalid}
                            error={error} />
  </Form>
)

CategoryCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'categoryCreate',
  validate: values => getValidate(values, categorySchema)
})(CategoryCreateForm)
