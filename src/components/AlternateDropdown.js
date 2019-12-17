import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class AlternateDropdown extends Component {
  state = {
    selectedValue: this.props.options[0].value,
  };

  handleChange = e => {
    this.props.setValueFn(e.target.value);
    this.setState({ selectedValue: e.target.value });
  };

  render() {
    const { label, id, options } = this.props;
    const { selectedValue } = this.state;

    return (
      <TextField
        style={{ width: '200px' }}
        id={id}
        select
        label={label}
        onChange={this.handleChange}
        value={selectedValue}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default AlternateDropdown;

/*
<AlternateDropdown
            className={classes.textInput}
            label="Select Company Stage"
            id="company-valuation"
            options={[
              { label: 'Seed', value: 5000000 },
              { label: 'Series A', value: 10000000 },
              { label: 'Series B', value: 15000000 },
            ]}
            setValueFn={this.prefillCompanyValuation}
/>

          <AlternateDropdown
            className={classes.textInput}
            label="Select Engineering Level"
            id="number-of-shares"
            options={[
              { label: 'Junior Engineer', value: 80000 },
              { label: 'Senior Engineer', value: 125000 },
              { label: 'CTO', value: 200000 },
            ]}
            setValueFn={this.prefillNumberOfShares}
/>
*/
