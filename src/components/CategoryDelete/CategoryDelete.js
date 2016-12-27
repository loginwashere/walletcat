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
import { createCategory, fetchCategoriesIfNeeded } from '../../actions';

export class CategoryDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const params = {
      name: this.state.name,
      description: this.state.description
    };

    dispatch(createCategory(params));
  }

  getValidationState = () => {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  render() {
    const { category } = this.props;
    return (
      <div>
        <h1>Delete Category</h1>
        <Form horizontal
              onSubmit={this.handleSubmit}>
          <Col sm={12}>
            <Alert bsStyle="warning">
              Are you  sure you want to delete category <strong>{category.name}</strong>?
            </Alert>
          </Col>

          <FormGroup>
            <Col smOffset={2} sm={2} xs={6}>
              <LinkContainer to={`/categories/${category.id}`}>
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
    dispatch(fetchCategoriesIfNeeded());
  }
}

CategoryDelete.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps)
  const category = state.categories.items
    .filter(category => category.id === +ownProps.params.categoryId)[0] || {};

  return {
    category
  };
}

export default connect(mapStateToProps)(CategoryDelete);
