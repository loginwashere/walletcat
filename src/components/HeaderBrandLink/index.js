import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { Navbar, Image } from 'react-bootstrap'
import Scroll from 'react-scroll'

import './style.less'

const HeaderBrandLink = ({ to, scroll = false, ...rest }) => {
  const LinkComponent = scroll
    ? Scroll.Link
    : IndexLink
  return (
    <Navbar.Brand>
      <LinkComponent {...rest} to={to} className='header__brand__link'>
        <Image src="/safari-pinned-tab.svg"
               width={50}
               height={50}
               className='header__brand__image' />
        <span className="header__brand__name">Wallet Cat</span>
      </LinkComponent>
    </Navbar.Brand>
  )
}

HeaderBrandLink.propTypes = {
  to: PropTypes.string.isRequired,
  scroll: PropTypes.bool
}

export default HeaderBrandLink
