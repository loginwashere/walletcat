import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { Navbar, Image } from 'react-bootstrap'

import './style.less'

const HeaderBrandLink = ({ to, ...rest }) => (
  <Navbar.Brand>
    <IndexLink {...rest} to={to} className='header__brand__link'>
      <Image src="/safari-pinned-tab.svg"
              width={50}
              height={50}
              className='header__brand__image' />
      <span className="header__brand__name">Wallet Cat</span>
    </IndexLink>
  </Navbar.Brand>
)

HeaderBrandLink.propTypes = {
  to: PropTypes.string.isRequired,
  scroll: PropTypes.bool
}

export default HeaderBrandLink
