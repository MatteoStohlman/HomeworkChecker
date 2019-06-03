import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose,withState} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MultiChecker from 'Dashboard/MultiChecker'
import Icon from '@material-ui/core/Icon';
import SingleChecker from 'Dashboard/SingleChecker'
import DialogContent from '@material-ui/core/DialogContent';
const styles={
  root:{
    paddingTop:150
  },
  picker:{
    padding:25,
    width:200,
    margin:15,
    display:'inline-block',
    cursor:'pointer',
    '&:hover':{
      backgroundColor:'#E0E0E0'
    }
  },
  dialogContent:{
    overflowY:'visible'
  },
  dialogRoot:{
    overflowY:'visible'
  }
}

const UiPicker = ({
  //PROPS
    //required

    //optional
    //calculated
  //STATE
    showMultipleChecker,setShowMultipleChecker,
    showSingleChecker,setShowSingleChecker,
  //OTHER
    classes,...props
})=> {
  const Picker = props =>(
    <Paper className={classes.picker} elevation='5' onClick={props.onClick}>
      <Icon fontSize='large'>{props.icon}</Icon>
      <Typography variant="h5" gutterBottom>
        {props.children}
      </Typography>
    </Paper>
  )
  return (
    <div className={classes.root}>
      <Picker icon='done' onClick={()=>setShowSingleChecker(true)}>Single Checker</Picker>
      <Picker icon='done_all' onClick={()=>setShowMultipleChecker(true)}>Multiple Checker</Picker>
      <Dialog open={showMultipleChecker} onClose={()=>setShowMultipleChecker(false)} fullWidth maxWidth={'md'} PaperProps={{className:classes.dialogRoot}}>
        <DialogTitle>Multiple Checker</DialogTitle>
        <MultiChecker/>
      </Dialog>
      <Dialog open={showSingleChecker} onClose={()=>setShowSingleChecker(false)} fullWidth maxWidth={'md'} PaperProps={{className:classes.dialogRoot}}>
        <DialogTitle>Single Checker</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <SingleChecker/>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default compose(
  withState('showMultipleChecker','setShowMultipleChecker',false),
  withState('showSingleChecker','setShowSingleChecker',true),
  withStyles(styles)
)(UiPicker)
