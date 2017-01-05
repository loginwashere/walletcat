import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { createCategory, fetchCategoriesIfNeeded } from '../../actions';

export class CategoryView extends Component {
  constructor(props) {
    super(props);

    const { category } = this.props;

    this.state = {
      name: category.name,
      description: category.description
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
        <h1>Category {category.name}</h1>
        <Form horizontal
              onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl required
                           type="text"
                           placeholder="Name"
                           onChange={this.handleNameChange}
                           value={this.state.name} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalDescription">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={10}>
              <FormControl type="text"
                           placeholder="Description"
                           onChange={this.handleDescriptionChange}
                           value={this.state.description} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={2} xs={4}>
              <LinkContainer to="/categories">
                <Button type="submit">
                  Cancel
                </Button>
              </LinkContainer>
            </Col>
            <Col sm={2} xs={4}>
              <LinkContainer to={`/categories/${category.id}/delete`}>
                <Button type="submit">
                  Delete
                </Button>
              </LinkContainer>
            </Col>
            <Col sm={2} xs={4}>
              <Button type="submit">
                Edit
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

CategoryView.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const category = state.categories[ownProps.params.categoryId] || {};

  return {
    category
  };
}

export const CategoryViewConnected = connect(mapStateToProps)(CategoryView);

export default CategoryViewConnected;
