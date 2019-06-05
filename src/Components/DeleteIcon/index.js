import React from 'react';
import {compose,pure} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = {
  root:{
    cursor:'pointer'
  }
}

const DeleteIcon = ({
  //PROPS
    //optional
      onClick,iconName='delete',
  //OTHER
    classes,...props
})=> {

  return (
    <Icon onClick={onClick&&onClick} className={classes.root} {...props}>{iconName}</Icon>
  )
}

export default compose(
  pure,
  withStyles(styles)
)(DeleteIcon)
