import React, { PropTypes } from 'react'
import { Pager } from 'react-bootstrap'

// this is a work-around for https://github.com/react-bootstrap/react-bootstrap/issues/2304
// to avoid the annoying "Unknown prop `active` ... " warnings.
// We wrap <Pager.Item> but strip off the 'active' property.
const WalletPagerItem = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { active, ...propsWithoutActive } = props
  return <Pager.Item {...propsWithoutActive}>{ props.children }</Pager.Item>
}

WalletPagerItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  active: PropTypes.bool
}

export default WalletPagerItem