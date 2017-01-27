import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Form,
  FormGroup,
  Col,
  Button,
  Alert
} from 'react-bootstrap'
import { deleteTransaction, fetchTransactionsIfNeeded } from '../../actions'

export class TransactionDelete extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, transaction: { id } } = this.props
    return dispatch(deleteTransaction(id))
  }

  render() {
    const { transaction } = this.props
    return (
      <div>
        <h1>Delete Transaction</h1>
        <Form horizontal
              onSubmit={this.handleSubmit}>
          <Col sm={12}>
            <Alert bsStyle="warning">
              Are you  sure you want to delete category
              {' '}
              <strong>{transaction.id}</strong>?
            </Alert>
          </Col>

          <FormGroup>
            <Col smOffset={2} sm={2} xs={6}>
              <LinkContainer to={`/transactions/${transaction.id}`}>
                <Button type="submit">
                  Cancel
                </Button>
              </LinkContainer>
            </Col>
            <Col sm={2} xs={6}>
              <Button type="submit">
                Delete
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTransactionsIfNeeded())
  }
}

TransactionDelete.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const transaction = state.transactions.items[ownProps.params.transactionId] || {}
  return {
    transaction
  }
}

export default connect(mapStateToProps)(TransactionDelete)
