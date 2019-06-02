import React from 'react';
import Typography from '@material-ui/core/Typography';
import {compose,withProps} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Row from 'Dashboard/Row'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
    height:'100vh'
  },
  table: {
    minWidth: 650,
  },
}

const ConvertTable = ({
  //PROPS
    //required

    //optional
      variant='body1',
    //calculated

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
          </TableRow>
        </TableHead>
          <Row/>
          <Row/>
        <TableBody>

        </TableBody>
      </Table>
    </Paper>
  )
}

export default compose(
  withStyles(styles)
)(ConvertTable)
