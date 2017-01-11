import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  Button,
  Alert
} from 'react-bootstrap';
import {
  deleteAccount,
  fetchAccountsAndAppAndUserCurrenciesIfNeeded
} from '../../actions';

export class AccountDelete extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, account: { id } } = this.props;
    dispatch(deleteAccount(id));
  }

  render() {
    const { account } = this.props;
    return (
      <div>
        <h1>Delete Account</h1>
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
        </Form>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAccountsAndAppAndUserCurrenciesIfNeeded());
  }
}

AccountDelete.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const account = state.accounts.items[ownProps.params.accountId] || {};
  return {
    account
  };
}

AccountDelete = connect(mapStateToProps)(AccountDelete);

export default AccountDelete;
