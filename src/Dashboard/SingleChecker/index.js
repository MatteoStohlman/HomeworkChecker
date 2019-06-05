import React from 'react';
import {compose,withState,withHandlers} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import UnitPicker from 'Components/UnitPicker'
import TextField from '@material-ui/core/TextField';
import math from 'mathjs'
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles={
  root:{
    padding:25,
  },
  spacing:{
    height:18,
    width:'100%',
  }
}

const SingleChecker = ({
  //PROPS
    //required

    //optional
      variant='body1',
    //calculated

  //STATE
    fromValue,handleFromUnitSelect,handleFromValueChange,
    toType,toUnit,handleToUnitSelect,
    studentResponse,handleStudentResponseChange,
    studentError,setStudentError,
  //HANDLERS
    calculateResult,handleDelete,
  //OTHER
    classes,...props
})=> {
  const result = calculateResult();
  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        value={fromValue}
        onChange={(e)=>handleFromValueChange(e.target.value)}
        type="number"
        label='From Value'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div className={classes.spacing}/>
      <UnitPicker onChange={handleFromUnitSelect}/>
      <div className={classes.spacing}/>
      <UnitPicker units={toType} value={toUnit} onChange={handleToUnitSelect}/>
      <div className={classes.spacing}/>
      <TextField
        fullWidth
        error={studentError}
        value={studentResponse}
        onChange={(e)=>handleStudentResponseChange(e.target.value)}
        type="number"
        label='Student Response'
        InputProps={{
          startAdornment:studentError?
            <InputAdornment position='start'><Icon>close</Icon></InputAdornment>
            :
            <InputAdornment position='start'><Icon>check</Icon></InputAdornment>
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}

export default compose(
  withState('fromValue','setFromValue',""),
  withState('fromUnit','setFromUnit',null),
  withState('fromType','setFromType',null),
  withState('toValue','setToValue',null),
  withState('toUnit','setToUnit',null),
  withState('toType','setToType',null),
  withState('studentResponse','setStudentResponse',""),
  withState('studentError','setStudentError',false),
  withState('studentSuccess','setStudentSuccess',false),
  withHandlers({
    calculateError:props=>(toValue)=>{
      let shouldShowError = false;
      let shouldShowSuccess = false;
      if(toValue&&props.studentResponse){
        let roundedToValue = math.round(toValue,1)
        let roundedResp = math.round(props.studentResponse,1)
        if(roundedToValue!==roundedResp){
          shouldShowError=true
        }else{
          shouldShowSuccess=true
        }
      }
      if(props.studentError!==shouldShowError){
        props.setStudentError(shouldShowError)
      }
      if(props.studentSuccess!==shouldShowSuccess){
        props.setStudentSuccess(shouldShowSuccess)
      }
    }
  }),
  withHandlers({
    calculateResult:props=>(overrides)=>{
      let {fromValue,fromUnit,toUnit} = props
      if(overrides){
        fromValue=overrides.fromValue||fromValue
        fromUnit=overrides.fromUnit||fromUnit
        toUnit=overrides.toUnit||toUnit
      }
      if(fromValue&&fromUnit&&toUnit){
        let from = math.unit(fromValue,fromUnit.toLowerCase())
        let toValue = from.toNumber(toUnit.toLowerCase())
        props.calculateError(toValue)
        return toValue&&math.round(toValue,1)
      }else{
        return false
      }
    }
  }),
  withHandlers({
    handleFromUnitSelect:props=>(selectedUnit)=>{
      if(!selectedUnit){//If the selected value is null e.g. the input is cleared
        props.setFromType(null)
        props.setFromUnit(null)
        return;
      }
      props.setFromType(selectedUnit.type)
      props.setFromUnit(selectedUnit.value)
      if(selectedUnit.type!==props.toType){//From and to Unit types must match. Cannot convert temp to volume
        props.setToType(selectedUnit.type)
        props.setToUnit(null)
      }
    },
    handleToUnitSelect:props=>(selectedUnit)=>{
      if(!selectedUnit){//If the selected value is null e.g. the input is cleared
        props.setToType(null)
        props.setToUnit(null)
        return
      }
      props.setToType(selectedUnit.type)
      props.setToUnit(selectedUnit.value)
    },
    handleFromValueChange:props=>(value)=>{
      props.setFromValue(value)
    },
    handleStudentResponseChange:props=>(value)=>{
      props.setStudentResponse(value)
    },
    handleDelete:props=>()=>{
      props.onDelete&&props.onDelete()
    }
  }),
  withStyles(styles)
)(SingleChecker)
