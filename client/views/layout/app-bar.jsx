import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import HomeIcon from '@material-ui/core/icons/Home';

class MainAppBar extends React.Component {
  constructor() {
    super()
    this.name = ''
    // this.onHomeIconClick = this.onHomeIconClickbind.bind(this)
    // this.createButtonClick = this.createButtonClick.bind(this)
    // this.loginButtonClick = this.loginButtonClick.bind(this)
  }

  onHomeIconClick() {
    // do
  }

  createButtonClick() {
    // do
  }

  loginButtonClick() {
    // do
  }

  render() {
    return (
      <div>
        <AppBar position="fixed">
          <IconButton color="contrast" onClick={this.onHomeIconClick}>
            {/* <HomeIcon /> */}
            d
          </IconButton>
          <Typography type="title" color="inherit">Red</Typography>
          <Button raised color="accent" onClick={this.createButtonClick}>
            新建话题
          </Button>
          <Button raised color="ontrast" onClick={this.loginButtonClick}>
            登录
          </Button>
        </AppBar>
      </div>
    )
  }
}

export default MainAppBar
