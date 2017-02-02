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
import {
  deleteAccount,
  fetchAccountsPageWithDependenies
} from '../../actions'

export class AccountDelete extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, accountId } = this.props
    return dispatch(deleteAccount(accountId))
  }

  render() {
    const { account } = this.props
    return (
      <div>
        <h1>Delete Account</h1>
        { account &&
          <Form horizontal
                onSubmit={this.handleSubmit}>
            <Col sm={12}>
              <Alert bsStyle="warning">
                Are you  sure you want to delete account
                {' '}
                <strong>{account.name}</strong>?
              </Alert>
            </Col>

            <FormGroup>
              <Col smOffset={2} sm={2} xs={6}>
                <LinkContainer to={`/accounts/${account.id}`}>
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
    const { dispatch, accountId } = this.props
    dispatch(fetchAccountsPageWithDependenies({ ids: [accountId] }))
  }
}

AccountDelete.propTypes = {
  accountId: PropTypes.string.isRequired,
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const accountId = ownProps.params.accountId
  const account = state.accounts.items[accountId]
  return {
    accountId,
    account
  }
}

export default connect(mapStateToProps)(AccountDelete)
