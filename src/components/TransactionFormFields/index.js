import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import {
  RenderField,
  WalletFormGroupSelect,
  RenderFieldDatetime
} from '../Common'

const TransactionFormFields = ({
  type,
  customInitialValues,
  loadAccountOptions,
  loadCategoriesOptions
}) => (
  <div>
    <Row>
      <Col sm={12}>
        From
      </Col>
    </Row>
    <Row>
      <Col sm={4}>
        {type === 'edit' && customInitialValues &&
          <Field type="hidden"
                  component="input"
                  name="transactionItems[0][id]" />}
        {(type === 'create' || customInitialValues) &&
          <Field required={true}
                name="transactionItems[0][accountId]"
                component={WalletFormGroupSelect}
                label="Account"
                loadOptions={loadAccountOptions}
                labelColProps={{ sm: 3 }}
                valueColProps={{ sm: 9 }} />}
      </Col>
      <Col sm={4}>
        <Field required={true}
              name="transactionItems[0][amount]"
              component={RenderField}
              label="Amount"
              type="number"
              labelColProps={{ sm: 3 }}
              valueColProps={{ sm: 9 }} />
        <Field type="hidden"
               component="input"
               name="transactionItems[1][type]" />
      </Col>
      <Col sm={4}>
        <Field required={true}
              name="transactionItems[0][rate]"
              component={RenderField}
              label="Rate"
              type="number"
              labelColProps={{ sm: 3 }}
              valueColProps={{ sm: 9 }} />
      </Col>
    </Row>
    <Row>
      <Col sm={12}>
        To
      </Col>
    </Row>
    <Row>
      <Col sm={4}>
        {type === 'edit' && customInitialValues &&
          <Field type="hidden"
               component="input"
               name="transactionItems[1][id]" />}
        {(type === 'create' || customInitialValues) &&
          <Field required={true}
                name="transactionItems[1][accountId]"
                component={WalletFormGroupSelect}
                label="Account"
                loadOptions={loadAccountOptions}
                labelColProps={{ sm: 3 }}
                valueColProps={{ sm: 9 }} />}
      </Col>
      <Col sm={4}>
        <Field required={true}
              name="transactionItems[1][amount]"
              component={RenderField}
              label="Amount"
              type="number"
              labelColProps={{ sm: 3 }}
              valueColProps={{ sm: 9 }} />
        <Field type="hidden"
               component="input"
               name="transactionItems[1][type]" />
      </Col>
      <Col sm={4}>
        <Field required={true}
              name="transactionItems[1][rate]"
              component={RenderField}
              label="Rate"
              type="number"
              labelColProps={{ sm: 3 }}
              valueColProps={{ sm: 9 }} />
      </Col>
    </Row>
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