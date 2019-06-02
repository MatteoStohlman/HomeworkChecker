import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose,withProps,withState,withHandlers} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import UnitPicker from 'Components/UnitPicker'
import TextField from '@material-ui/core/TextField';
import math from 'mathjs'
const COMPONENT_NAME = ({
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
    calculateResult,
  //OTHER
    ...props
})=> {
  return (
    <TableRow>
      <TableCell>
        <TextField
          value={fromValue}
          onChange={(e)=>handleFromValueChange(e.target.value)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell>
        <UnitPicker onChange={handleFromUnitSelect}/>
      </TableCell>
      <TableCell>
        <UnitPicker units={toType} value={toUnit} onChange={handleToUnitSelect}/>
      </TableCell>
      <TableCell>
        <TextField
          error={studentError}
          value={studentResponse}
          onChange={(e)=>handleStudentResponseChange(e.target.value)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell>
        {calculateResult()}
      </TableCell>
    </TableRow>
  )
}

export default compose(
  withState('fromValue','setFromValue',null),
  withState('fromUnit','setFromUnit',null),
  withState('fromType','setFromType',null),
  withState('toValue','setToValue',null),
  withState('toUnit','setToUnit',null),
  withState('toType','setToType',null),
  withState('studentResponse','setStudentResponse',null),
  withState('studentError','setStudentError',false),
  withHandlers({
    calculateError:props=>(toValue)=>{
      let shouldShowError = false;
      if(toValue&&props.studentResponse){
        let roundedToValue = math.round(toValue,1)
        let roundedResp = math.round(props.studentResponse,1)
        if(roundedToValue!=roundedResp){
          shouldShowError=true
        }
      }
      if(props.studentError!==shouldShowError){
        props.setStudentError(shouldShowError)
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
        console.log('Invalid values for Calculation');
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
      if(selectedUnit.type!=props.toType){//From and to Unit types must match. Cannot convert temp to volume
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
    }
  })
)(COMPONENT_NAME)
