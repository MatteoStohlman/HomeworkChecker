import React from 'react';
import {compose,withState,withHandlers} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Row from 'Dashboard/Row'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
    height:600,
    textAlign:'center'
  },
  table: {
    minWidth: 650,
  },
  addRowButton:{
    marginTop:25,
  }
}

const ConvertTable = ({
  //PROPS
    //required

    //optional
      variant='body1',
    //calculated
  //STATE
    rows,addRow,handleRemoveRow,
  //OTHER
    classes,...props
})=> {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>From Value</TableCell>
            <TableCell>From Unit</TableCell>
            <TableCell>To Unit</TableCell>
            <TableCell>Student Response</TableCell>
            <TableCell>Result</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row)=>(
            <Row key={row.id} onDelete={()=>handleRemoveRow(row.id)}/>
          ))}
        </TableBody>
      </Table>
      <Fab color="primary" onClick={addRow} className={classes.addRowButton}>
        <AddIcon />
      </Fab>
    </Paper>
  )
}

export default compose(
  withState('rows','setRows',[{id:0}]),
  withHandlers({
    addRow:props=>(id=false)=>{
      props.setRows([...props.rows,{id:props.rows.length}])
    },
    handleRemoveRow:props=>(rowId)=>{
      props.setRows(props.rows.filter((row)=>row.id!==rowId))
    }
  }),
  withStyles(styles)
)(ConvertTable)
