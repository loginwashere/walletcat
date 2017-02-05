import React from 'react'
import { Field } from 'redux-form'
import { RenderField } from '../Common'

const CategoryFormFields = () => (
  <div>
    <Field required={true}
           name="name"
           component={RenderField}
           label="Name"
           type="text" />

    <Field name="description"
           component={RenderField}
           label="Description"
           type="text" />
  </div>
)

export default CategoryFormFields