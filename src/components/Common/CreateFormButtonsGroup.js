import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  FormGroup,
  Col,
  Button
} from 'react-bootstrap'

const CreateFormButtonsGroup = ({
  cancelTo,
  submitting,
  error,
  invalid,
  pristine,
  reset
}) => (
  <FormGroup>
    <Col smOffset={2} sm={2} xs={4}>
      <LinkContainer to={cancelTo}>
        <Button disabled={submitting}>
          Cancel
        </Button>
      </LinkContainer>
    </Col>
    <Col sm={2} xs={4}>
      <Button type="submit"
              disabled={submitting || (!error && invalid)}>
        Create
      </Button>
    </Col>
    <Col sm={2} xs={4}>
      <Button disabled={pristine || submitting}
              onClick={reset}>
        Clear
      </Button>
    </Col>
  </FormGroup>
)

CreateFormButtonsGroup.propTypes = {
  cancelTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  error: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default CreateFormButtonsGroup