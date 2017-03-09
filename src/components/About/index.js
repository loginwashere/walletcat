import React from 'react'
import { intlShape, injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  header: {
    id: 'About.header',
    defaultMessage: 'About',
    description: 'About header'
  }
})

const About = ({ intl }) => (
  <h1>{intl.formatMessage(messages.header)}</h1>
)

About.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(About)
