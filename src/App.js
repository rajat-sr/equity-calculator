import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classes from './App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={classes.Main}>
        <div className={classes.Card}>
          <Typography variant="h3">Equity Calculator</Typography>
          <TextField
            id="total-shares"
            label="Total Shares in the Company"
            className={classes.TextInput}
            margin="normal"
          />
          <TextField
            id="company-valuation"
            label="Valuation of the Company"
            className={classes.TextInput}
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            id="your-shares"
            label="Number of shares you hold"
            className={classes.TextInput}
            margin="normal"
          />
          <div className={classes.Result}>
            <Typography>YOUR SHARES ARE WORTH</Typography>
            <Typography variant="h4">$89765</Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
