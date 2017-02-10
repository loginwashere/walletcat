import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import { categorySchema } from '../../../common/validation'
import {
  WalletFormHeader,
  EditFormButtonsGroup,
  getValidate
} from '../Common'
import CategoryFormFields from '../CategoryFormFields'

const CategoryEditForm = ({
  category,
  error,
  handleSubmit,
  pristine,
  reset,
  submitting,
  invalid,
  currentPage
}) => (
  <Form horizontal
        onSubmit={handleSubmit}>
    <WalletFormHeader error={error}>Category {category.name}</WalletFormHeader>

    <CategoryFormFields />

    <EditFormButtonsGroup cancelTo={{ pathname: '/categories', query: { page: currentPage } }}
                          deleteTo={`/categories/${category.id}/delete`}
                          submitting={submitting}
                          pristine={pristine}
                          reset={reset}
                          invalid={invalid}
                          error={error}/>
  </Form>
)

CategoryEditForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default reduxForm({
  form: 'categoryEdit',
  validate: values => getValidate(values, categorySchema)
})(CategoryEditForm)
