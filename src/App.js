import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classes from './App.module.css';

class App extends React.Component {
  state = {
    totalShares: 1000,
    companyValuation: '',
    numberOfShares: '',
  };

  handleChange = (value, field) => {
    if (this.isInputValid(value, field)) {
      this.setState({ [field]: value });
    }
  };

  isInputValid = (input, field) => {
    const naturalNumbersRegex = /^[0-9]+$|^$/;
    const decimalNumbersRegex = /^[0-9]+$|^[0-9]+\.[0-9]*$|^$/;

    if (field === 'companyValuation') {
      return decimalNumbersRegex.test(input);
    }
    return naturalNumbersRegex.test(input);
  };

  calculateWorth = () => {
    const { totalShares, companyValuation, numberOfShares } = this.state;

    const pricePerShare = companyValuation / totalShares;
    const valueOfShares = pricePerShare * numberOfShares;
    return valueOfShares === Infinity ? null : valueOfShares;
  };

  formatAmount = amount => {
    let stringFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (amount < 1) {
      stringFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 4 };
    }

    return '$' + amount.toLocaleString('en', stringFormatOptions);
  };

  render() {
    const { totalShares, companyValuation, numberOfShares } = this.state;

    const holdings = this.calculateWorth();
    let resultComponent = (
      <>
        <Typography>Fill the fields above to find out the value of your shares</Typography>
      </>
    );
    if (typeof holdings === 'number' && !Number.isNaN(holdings)) {
      resultComponent = (
        <>
          <Typography>Your Shares Are Worth</Typography>
          <Typography variant="h4">{this.formatAmount(this.calculateWorth())}</Typography>
        </>
      );
    }

    return (
      <div className={classes.Main}>
        <div className={classes.Card}>
          <Typography variant="h3">Equity Calculator</Typography>
          <TextField
            id="total-shares"
            label="Total Shares in the Company"
            className={classes.TextInput}
            margin="normal"
            value={totalShares}
            onChange={e => this.handleChange(e.target.value, 'totalShares')}
          />
          <TextField
            id="company-valuation"
            label="Valuation of the Company"
            className={classes.TextInput}
            margin="normal"
            value={companyValuation}
            onChange={e => this.handleChange(e.target.value, 'companyValuation')}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            id="number-of-shares"
            label="Number of shares you hold"
            className={classes.TextInput}
            margin="normal"
            value={numberOfShares}
            onChange={e => this.handleChange(e.target.value, 'numberOfShares')}
          />
          <div className={classes.Result}>{resultComponent}</div>
        </div>
      </div>
    );
  }
}

export default App;
