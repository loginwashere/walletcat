import React, { PropTypes } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Row, Col, Button, Glyphicon, FormGroup } from 'react-bootstrap'
import {
  RenderField,
  WalletFormGroupSelect,
  RenderFieldDatetime
} from '../Common'

const toggleType = (fields, index) => () => {
  const currentField = fields.get(index)
  const type = currentField.type === 'debit'
    ? 'credit'
    : 'debit'
  fields.remove(index)
  fields.insert(index, { ...currentField, type })
}

const TransactionItems = ({ fields, meta: { touched, error }, ...props }) => (
  <div>
    {fields.map((transactionItem, index) =>
      <Row key={index}>
        <FormGroup>
          <Col sm={1} xs={3} smHidden mdHidden lgHidden>
            <Button
              type="button"
              bsStyle={ fields.get(index).type === 'debit'
                ? 'success'
                : 'danger' }
              title="Change type"
              onClick={toggleType(fields, index)}>
              <Glyphicon glyph={ fields.get(index).type === 'debit'
                ? 'plus'
                : 'minus' } />
            </Button>
            <Field
              type="hidden"
              component="input"
              name={`${transactionItem}.type`} />
          </Col>
          <Col xs={3} xsOffset={6} smHidden mdHidden lgHidden>
            <Button
              type="button"
              title="Remove Transaction Item"
              bsStyle="danger"
              onClick={() => fields.remove(index)}>
              <Glyphicon glyph="remove" />
            </Button>
          </Col>
        </FormGroup>
        <Col sm={1} xsHidden>
          <Button
            type="button"
            bsStyle={ fields.get(index).type === 'debit'
              ? 'success'
              : 'danger' }
            title="Change type"
            onClick={toggleType(fields, index)}>
            <Glyphicon glyph={ fields.get(index).type === 'debit'
              ? 'plus'
              : 'minus' } />
          </Button>
          <Field
            type="hidden"
            component="input"
            name={`${transactionItem}.type`} />
        </Col>
        <Col sm={3} xs={12}>
          {props.type === 'edit' && props.customInitialValues &&
            <Field
              type="hidden"
              component="input"
              name={`${transactionItem}.id`} />}
          {(props.type === 'create' || props.customInitialValues) &&
            <Field
              required={true}
              name={`${transactionItem}.accountId`}
              component={WalletFormGroupSelect}
              label="Account"
              loadOptions={props.loadAccountOptions}
              labelColProps={{ sm: 3, xs: 3 }}
              valueColProps={{ sm: 9, xs: 9 }} />}
        </Col>
        <Col sm={4} xs={12}>
          <Field
            required={true}
            name={`${transactionItem}.amount`}
            component={RenderField}
            label="Amount"
            type="number"
            labelColProps={{ sm: 3, xs: 3 }}
            valueColProps={{ sm: 9, xs: 9 }} />
        </Col>
        <Col sm={3} xs={12}>
          <Field
            required={true}
            name={`${transactionItem}.rate`}
            component={RenderField}
            label="Rate"
            type="number"
            labelColProps={{ sm: 3, xs: 3 }}
            valueColProps={{ sm: 9, xs: 9 }} />
        </Col>
        <Col sm={1} xs={12} xsHidden>
          <Button
            type="button"
            title="Remove Transaction Item"
            bsStyle="danger"
            onClick={() => fields.remove(index)}>
            <Glyphicon glyph="remove" />
          </Button>
        </Col>
      </Row>
    )}
    <FormGroup>
      <Col>
        <Button type="button" onClick={() => fields.push({ type: 'credit' })}>Add Transaction Item</Button>
        {touched && error && <span>{error}</span>}
      </Col>
    </FormGroup>
  </div>
)

TransactionItems.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  loadAccountOptions: PropTypes.func.isRequired
}

const TransactionFormFields = ({
  type,
  customInitialValues,
  loadAccountOptions,
  loadCategoriesOptions
}) => (
  <div>
    <FieldArray
      name="transactionItems"
      component={TransactionItems}
      props={{
        type,
        customInitialValues,
        loadAccountOptions
      }}
    />
    <Row>
      <Col sm={6}>
        <Field required={true}
              name="date"
              component={RenderFieldDatetime}
              label="Date"
              type="text"
              labelColProps={{ sm: 2 }}
              valueColProps={{ sm: 10 }} />
      </Col>
      <Col sm={6}>
        {(type === 'create' || customInitialValues) &&
          <Field required={true}
                name="categoryId"
                component={WalletFormGroupSelect}
                label="Category"
                loadOptions={loadCategoriesOptions}
                labelColProps={{ sm: 2 }}
                valueColProps={{ sm: 10 }} />}
      </Col>
    </Row>
    <Field name="description"
           component={RenderField}
           label="Description"
           type="text"
           labelColProps={{ sm: 1 }}
           valueColProps={{ sm: 11 }} />
  </div>
)

TransactionFormFields.propTypes = {
  type: PropTypes.string.isRequired,
  customInitialValues: PropTypes.object,
  loadAccountOptions: PropTypes.func.isRequired,
  loadCategoriesOptions: PropTypes.func.isRequired
}

export default TransactionFormFields
