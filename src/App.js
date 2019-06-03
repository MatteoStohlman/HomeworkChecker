import React from 'react';
import './App.css';
import ConvertTable from 'Dashboard/ConvertTable'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function App() {
  return (
    <div className="App">
      <Dialog open={true} fullWidth maxWidth={'md'}>
        <DialogTitle>Conversions Checker</DialogTitle>
        <ConvertTable/>
      </Dialog>
    </div>
  );
}

export default App;
