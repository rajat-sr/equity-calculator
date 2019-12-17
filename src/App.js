import React from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './App.module.css';

import Select from './components/Select';
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
    const naturalNumbersPattern = /^[0-9]+$|^$/;
    const decimalNumbersPattern = /^[0-9]+$|^[0-9]+\.[0-9]*$|^$/;

    if (field === 'companyValuation') {
      return decimalNumbersPattern.test(input);
    }
    return naturalNumbersPattern.test(input);
  };

  calculateWorth = () => {
    const { totalShares, companyValuation, numberOfShares } = this.state;

    if (!totalShares && companyValuation) {
      return companyValuation;
    }

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

    const totalWorth = this.calculateWorth();
    const totalWorthInUSD =
      typeof totalWorth === 'number' && !Number.isNaN(totalWorth)
        ? this.formatAmount(totalWorth)
        : '$0.00';

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
            label="Company Valuation (in USD)"
            className={classes.textInput}
            margin="normal"
            value={companyValuation}
            onChange={e => this.handleChange(e.target.value, 'companyValuation')}
            helperText="Or choose the company stage from below"
          />
          <Select
            setValueFn={this.prefillCompanyValuation}
            options={[
              { label: 'Seed', value: 5000000 },
              { label: 'Series A', value: 10000000 },
              { label: 'Series B', value: 15000000 },
            ]}
          />
          <TextField
            id="number-of-shares"
            label="Number Of Shares You Own"
            className={classes.textInput}
            margin="normal"
            value={numberOfShares}
            onChange={e => this.handleChange(e.target.value, 'numberOfShares')}
            helperText="Or choose the engineering level from below"
          />
          <Select
            setValueFn={this.prefillNumberOfShares}
            options={[
              { label: 'Junior Engineer', value: 80000 },
              { label: 'Senior Engineer', value: 125000 },
              { label: 'CTO', value: 200000 },
            ]}
          />
          <div className={classes.result} style={{ backgroundImage: `url(${Background})` }}>
            <p className={classes.resultText}>Your Shares Are Worth</p>
            <p className={classes.amount}>{totalWorthInUSD}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
