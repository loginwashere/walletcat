import Joi from 'joi'
import errorMessages from '../../../server/utils/errorMessages'
import RenderError from './RenderError'
import RenderField from './RenderField'
import RenderFieldDatetime from './RenderFieldDatetime'
import RenderFieldSelect from './RenderFieldSelect'
import RenderFieldWithoutCol from './RenderFieldWithoutCol'

const getValidate = (values, schema) =>
  errorMessages(Joi.validate(values, schema, { abortEarly: false }))

export {
  getValidate,
  RenderError,
  RenderField,
  RenderFieldDatetime,
  RenderFieldSelect,
  RenderFieldWithoutCol
}
