import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  FormGroup,
  Col,
  Button
} from 'react-bootstrap'

const EditFormButtonsGroup = ({
  cancelTo,
  deleteTo,
  submitting,
  error,
  invalid,
  pristine,
  reset
}) => (
  <FormGroup>
    <Col smOffset={2} sm={2} xs={3}>
      <LinkContainer to={cancelTo}>
        <Button>
          Cancel
        </Button>
      </LinkContainer>
    </Col>
    <Col sm={2} xs={3}>
      <LinkContainer to={deleteTo}>
        <Button>
          Delete
        </Button>
      </LinkContainer>
    </Col>
    <Col sm={2} xs={3}>
      <Button type="submit" disabled={submitting || (!error && invalid)}>
        Edit
      </Button>
    </Col>
    <Col sm={2} xs={3}>
      <Button disabled={pristine || submitting}
              onClick={reset}>
        Clear
      </Button>
    </Col>
  </FormGroup>
)

EditFormButtonsGroup.propTypes = {
  cancelTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  deleteTo: PropTypes.string.isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default EditFormButtonsGroup