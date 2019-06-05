import React from 'react';
import './App.css';
import ConversionChecker from 'Dashboard/ConversionChecker'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function App() {
  return (
    <div className="App">
      <Dialog open={true} fullWidth maxWidth={'md'}>
        <DialogTitle>Conversions Checker</DialogTitle>
        <ConversionChecker/>
      </Dialog>
    </div>
  );
}

export default App;
