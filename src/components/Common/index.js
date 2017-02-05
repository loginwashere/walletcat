import Joi from 'joi'
import errorMessages from '../../../server/utils/errorMessages'
import RenderError from './RenderError'
import RenderField from './RenderField'
import RenderFieldDatetime from './RenderFieldDatetime'
import RenderFieldSelect from './RenderFieldSelect'
import RenderFieldWithoutCol from './RenderFieldWithoutCol'
import WalletPager from './WalletPager'
import WalletSelect from './WalletSelect'
import WalletFormGroupSelect from './WalletFormGroupSelect'
import WalletFormGroup from './WalletFormGroup'
import WalletFormHeader from './WalletFormHeader'
import CreateFormButtonsGroup from './CreateFormButtonsGroup'
import EditFormButtonsGroup from './EditFormButtonsGroup'

const getValidate = (values, schema) =>
  errorMessages(Joi.validate(values, schema, { abortEarly: false }))


const validationState = (touched, error, warning, valid) => (touched && (
    (error && 'error') ||
    (warning && 'warning') ||
    (!warning && valid && 'success'))) ||
  null


const formValidationState = error => (error && 'error') || null

export {
  getValidate,
  validationState,
  formValidationState,
  RenderError,
  RenderField,
  RenderFieldDatetime,
  RenderFieldSelect,
  RenderFieldWithoutCol,
  WalletPager,
  WalletSelect,
  WalletFormGroupSelect,
  WalletFormGroup,
  WalletFormHeader,
  CreateFormButtonsGroup,
  EditFormButtonsGroup
}
