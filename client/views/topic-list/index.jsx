import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.msg = ''
  }
  componentDidMount() {
    // do something
    // console.log(this.props.appState)
    const { appState } = this.props
    this.msg = appState.msg
  }

  render() {
    return (
      <div>{this.props.appState.msg}</div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
