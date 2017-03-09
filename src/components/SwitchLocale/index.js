import React, { Component, PropTypes } from 'react'
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { updateIntl } from 'react-intl-redux'
import { bindActionCreators } from 'redux'
import { intlShape, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { LOCALE_EN, LOCALE_RU, LOCALE_UK } from '../../config'
import localeMessages from '../../translations'
import messages from './messages'

import './style.less'

const DropDownTitle = ({ icon, label }) => (
  <span>
    <span title={label} className={`flag-icon flag-icon-${icon}`}></span>
  </span>
)

DropDownTitle.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export class SwitchLocale extends Component {
  constructor(props) {
    super(props)

    const { intl } = this.props

    this.state = {
      options: [
        {
          value: LOCALE_EN,
          icon: 'us',
          label: intl.formatMessage(messages.english)
        },
        {
          value: LOCALE_RU,
          icon: 'ru',
          label: intl.formatMessage(messages.russian)
        },
        {
          value: LOCALE_UK,
          icon: 'ua',
          label: intl.formatMessage(messages.ukrainian)
        }
      ]
    }
  }

  onClick = (val) => () => {
    const value = typeof val === 'object'
      ? val.value
      : val
    this.props.updateIntl({
      locale: value,
      messages: localeMessages[value],
    })
  }

  render() {
    const { eventKey, currentLocale } = this.props
    const currentLocaleOption = this.state.options
      .filter(option => option.value === currentLocale)[0]
    return (
      <NavDropdown eventKey={eventKey}
                   title={<DropDownTitle {...currentLocaleOption} />}
                   id="change-locale-item-dropdown"
                   className="SwitchLocale">
          {this.state.options.map((option, index) => (
            <MenuItem key={index}
                      active={option.value === currentLocale}
                      eventKey={`${eventKey}.${index}`}
                      onClick={this.onClick(option.value)}>
              <DropDownTitle {...option} />
            </MenuItem>))}
      </NavDropdown>
    )
  }
}

SwitchLocale.propTypes = {
  updateIntl: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  eventKey: PropTypes.number,
  currentLocale: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  currentLocale: state.intl.locale
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateIntl }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SwitchLocale))
