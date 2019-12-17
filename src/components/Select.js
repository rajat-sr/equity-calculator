import React, { PureComponent } from 'react';
import classes from './Select.module.css';

const SelectButton = props => {
  const { name, index, selected, onClickFn } = props;

  let cssClass = `${classes.button}`;
  if (selected) {
    cssClass = `${classes.button} ${classes.selectedButton}`;
  }

  return (
    <div className={cssClass} onClick={() => onClickFn(index)}>
      {name}
    </div>
  );
};

class Select extends PureComponent {
  state = {
    selectedOption: null,
  };

  handleButtonClick = index => {
    const { selectedOption } = this.state;
    const { options } = this.props;

    if (index === selectedOption) {
      return this.setState({ selectedOption: null });
    }
    this.props.setValueFn(options[index].value);
    this.setState({ selectedOption: index });
  };

  render() {
    const { selectedOption } = this.state;
    const { options } = this.props;

    const allButtons = options
      ? options.map((option, index) => {
          const selected = index === selectedOption;
          return (
            <SelectButton
              key={option.label}
              onClickFn={this.handleButtonClick}
              className={classes.buttons}
              name={option.label}
              index={index}
              selected={selected}
            />
          );
        })
      : null;

    return <div className={classes.allButtons}>{allButtons}</div>;
  }
}

export default Select;
