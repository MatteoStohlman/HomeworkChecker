import React from 'react';
import {compose,withState,withHandlers} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import UnitPicker from 'Components/UnitPicker'
import TextField from '@material-ui/core/TextField';
import math from 'mathjs'
import DeleteIcon from 'Components/DeleteIcon'

const styles= {
  row:{
    backgroundColor:props=>props.studentError?'rgb(255, 224, 224)':props.studentSuccess?'rgb(223, 239, 216)':'white',
  }
}

const ConversionRow = ({
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
  let result = calculateResult();
  return (
    <TableRow className={classes.row} data-cy='row'>
      <TableCell>
        <TextField
          className='fromInput'
          value={fromValue}
          onChange={(e)=>handleFromValueChange(e.target.value)}
          type="number"
          InputProps={{disableUnderline:true,"data-cy":'fromValue'}}
          placeholder='value'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell>
        <UnitPicker inputProps={{"data-cy":'fromUnit'}} onChange={handleFromUnitSelect}/>
      </TableCell>
      <TableCell>
        <UnitPicker inputProps={{"data-cy":'toUnit'}} units={toType} value={toUnit} onChange={handleToUnitSelect}/>
      </TableCell>
      <TableCell>
        <TextField
          className='toInput'
          value={studentResponse}
          onChange={(e)=>handleStudentResponseChange(e.target.value)}
          type="number"
          InputProps={{disableUnderline:true,"data-cy":'guess'}}
          placeholder='value'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell>
        <div data-cy='result'>
          {result}
        </div>
      </TableCell>
      <TableCell>
        <DeleteIcon onClick={handleDelete}/>
      </TableCell>
    </TableRow>
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
    //Compare conversion "TO" value to Student Response value and set state
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
    //Calculate Conversion "TO" value
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
)(ConversionRow)
