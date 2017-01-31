import React, { PropTypes } from 'react'
import { Pager } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import WalletPagerItem from './WalletPagerItem'

const WalletPager = ({
  hasPrev,
  hasNext,
  page,
  route,
  prevTitile='Previous Page',
  nextTitle='Next Page'
}) => (
  <Pager>
    <LinkContainer to={{ pathname: route, query: { page: page - 1 } }}>
      <WalletPagerItem previous
                  disabled={!hasPrev}>{prevTitile}</WalletPagerItem>
    </LinkContainer>
    <LinkContainer to={{ pathname: route, query: { page: page + 1 } }}>
      <WalletPagerItem next
                  disabled={!hasNext}>{nextTitle}</WalletPagerItem>
    </LinkContainer>
  </Pager>
)

WalletPager.propTypes = {
  hasPrev: PropTypes.bool,
  hasNext: PropTypes.bool,
  page: PropTypes.number,
  route: PropTypes.string,
  prevTitile: PropTypes.string,
  nextTitle: PropTypes.string
}

export default WalletPager