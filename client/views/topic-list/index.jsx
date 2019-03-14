import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.msg = ''
  }
  componentDidMount() {
    // console.log(this.props.appState)
    const { appState } = this.props
    this.msg = appState.msg
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          {this.props.appState.msg}
        </Button>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
