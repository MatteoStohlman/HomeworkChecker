import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose,withProps} from 'recompose';
import { withStyles } from '@material-ui/core/styles';

const COMPONENT_NAME = ({
  //PROPS
    //required

    //optional
      variant='body1',
    //calculated

  //OTHER
    ...props
})=> {

  return (
    <Typography variant={variant} gutterBottom>
      test
    </Typography>
  )
}

export default compose(
  withProps(props=>({

  }))
)(COMPONENT_NAME)
