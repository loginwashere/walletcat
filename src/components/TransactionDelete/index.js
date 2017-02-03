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
import { deleteTransaction, fetchTransactionsPageWithDependencies } from '../../actions'

export class TransactionDelete extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, transactionId } = this.props
    return dispatch(deleteTransaction(transactionId))
  }

  render() {
    const { transaction } = this.props
    return (
      <div>
        <h1>Delete Transaction</h1>
        {transaction &&
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
          </Form>}
      </div>
    )
  }

  componentDidMount() {
    const { dispatch, transactionId } = this.props
    dispatch(fetchTransactionsPageWithDependencies({ filter: { id: [transactionId] } }))
  }
}

TransactionDelete.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  transactionId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const transactionId = ownProps.params.transactionId
  const transaction = state.transactions.items[transactionId]
  return {
    transaction,
    transactionId
  }
}

export default connect(mapStateToProps)(TransactionDelete)
