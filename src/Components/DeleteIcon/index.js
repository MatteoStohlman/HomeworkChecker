import React from 'react';
import {compose,pure,withHandlers} from 'recompose';
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
  //HANDLERS
    handleClick,
  //OTHER
    classes,...props
})=> {
  return (
    <Icon onClick={handleClick} className={classes.root} {...props}>{iconName}</Icon>
  )
}

export default compose(
  pure,
  withHandlers({
    handleClick:({onClick})=>()=>{
      if(onClick&&typeof onClick=='function'){
        onClick()
      }
    }
  }),
  withStyles(styles),
)(DeleteIcon)
