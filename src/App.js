import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classes from './App.module.css';

import Dropdown from './components/Dropdown';
import Background from './assets/bg.jpg';

class App extends React.Component {
  state = {
    totalShares: '',
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
    return valueOfShares === Infinity ? 0 : valueOfShares;
  };

  formatAmount = amount => {
    let stringFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (amount < 1) {
      stringFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 4 };
    }

    return '$' + amount.toLocaleString('en', stringFormatOptions);
  };

  prefillNumberOfShares = value => {
    this.setState({ numberOfShares: value });
  };

  prefillCompanyValuation = value => {
    this.setState({ companyValuation: value });
  };

  render() {
    const { totalShares, companyValuation, numberOfShares } = this.state;

    const holdings = this.calculateWorth();
    const totalWorth =
      typeof holdings === 'number' && !Number.isNaN(holdings) ? this.formatAmount(holdings) : '$0.00';

    const resultComponent = (
      <>
        <p className={classes.resultText}>Your Shares Are Worth</p>
        <p className={classes.amount}>{totalWorth}</p>
      </>
    );

    return (
      <div className={classes.main}>
        <div className={classes.card}>
          <p className={classes.heading}>Equity Calculator</p>
          <TextField
            id="total-shares"
            label="Total Shares In The Company"
            className={classes.textInput}
            margin="normal"
            value={totalShares}
            onChange={e => this.handleChange(e.target.value, 'totalShares')}
          />
          <TextField
            id="company-valuation"
            label="The Current Value Of The Company (in USD)"
            className={classes.textInput}
            margin="normal"
            value={companyValuation}
            onChange={e => this.handleChange(e.target.value, 'companyValuation')}
          />
          <Dropdown
            setValueFn={this.prefillCompanyValuation}
            options={[
              { option: 'Seed', value: 5000000 },
              { option: 'Series A', value: 10000000 },
              { option: 'Series B', value: 15000000 },
            ]}
          />
          <TextField
            id="number-of-shares"
            label="Number Of Shares You Own In The Company"
            className={classes.textInput}
            margin="normal"
            value={numberOfShares}
            onChange={e => this.handleChange(e.target.value, 'numberOfShares')}
          />
          <Dropdown
            setValueFn={this.prefillNumberOfShares}
            options={[
              { option: 'Junior Engineer', value: 80000 },
              { option: 'Senior Engineer', value: 125000 },
              { option: 'CTO', value: 200000 },
            ]}
          />
          <div className={classes.result} style={{ backgroundImage: `url(${Background})` }}>
            {resultComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
