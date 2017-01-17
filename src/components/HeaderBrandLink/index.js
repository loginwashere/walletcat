import React from 'react'
import { IndexLink } from 'react-router'
import { Navbar, Image } from 'react-bootstrap'

import './style.less';

const HeaderBrandLink = ({to, ...rest}) => (
  <Navbar.Brand>
    <IndexLink to={to} className='header__brand__link'>
      <Image src="/safari-pinned-tab.svg"
              width={50}
              height={50}
              className='header__brand__image' />
      <span className="header__brand__name">Wallet Cat</span>
    </IndexLink>
  </Navbar.Brand>
)

export default HeaderBrandLink