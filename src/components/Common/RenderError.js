import React, { PropTypes } from 'react'
import {
  HelpBlock
} from 'react-bootstrap'

export const RenderError = ({ error }) => (
  <div>
    {error
      ? ((Array.isArray(error)
            ? error
            : [error])
          .map((i, index) => <HelpBlock key={index}>{i}</HelpBlock>))
      : null}
  </div>
)

RenderError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
}

export default RenderError
