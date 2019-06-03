import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose,withProps,withHandlers,withState} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
    width:150,
    height:32,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  noOptionsMessage: {
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  }
});
function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      InputProps={{
        inputComponent,
        disableUnderline:true,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

function IndicatorsContainer(){
  return null
}
const UnitPicker = ({
  //PROPS
    //required
      units,//temperature or volume
    //optional//

    //derived
      options,optionTypes,isControlled,controlledValue,
  //STATE
    stateValue,handleSelectChange,
  //OTHER
    classes,...props
})=> {
  const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    IndicatorsContainer
  };
  return (
    <Select
      classes={classes}
      options={options}
      components={components}
      value={isControlled?controlledValue:stateValue}
      placeholder='pick units'
      isClearable
      onChange={handleSelectChange}
    />
  )
}
let makeUnit = (name,abbr,type) => ({name, abbr, type, label:name, value:name})
let getOptions = (filterByType=false) => {
  let units = [
    makeUnit('Celsius','C','temperature'),
    makeUnit('Kelvin','K','temperature'),
    makeUnit('Fahrenheit','F','temperature'),
    makeUnit('Rankine','R','temperature'),
    makeUnit('Liters','L','volume'),
    makeUnit('Tablespoons','Tbls','volume'),
    makeUnit('Cubic-Inches','In3','volume'),
    makeUnit('Cups','Cups','volume'),
    makeUnit('Cubic-Feet','Ft3','volume'),
    makeUnit('Gallons','Gal','volume'),
  ]
  if(filterByType&&filterByType!=='all'){
    return units.filter((unit)=>unit.type===filterByType)
  }
  return units
}
export default compose(
  withProps(props=>{
    return({
      options:getOptions(props.units),
      isControlled: props.value===undefined?false:true,
      controlledValue:props.value?{value:props.value,label:props.value}:null
    })
  }),
  withState('stateValue','setStateValue',null),
  withHandlers({
    handleSelectChange:props=>(selectedUnit)=>{
      !props.isControlled&&props.setStateValue(selectedUnit)
      props.onChange&&props.onChange(selectedUnit)
    }
  }),
  withStyles(styles)
)(UnitPicker)
