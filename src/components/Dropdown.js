import React, { PureComponent } from 'react';
import classes from './Dropdown.module.css';

const DropdownButton = props => {
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

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

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
      ? options.map((button, index) => {
          const selected = index === selectedOption;
          return (
            <DropdownButton
              key={button.option}
              onClickFn={this.handleButtonClick}
              className={classes.buttons}
              name={button.option}
              index={index}
              selected={selected}
            />
          );
        })
      : null;
    return <div className={classes.allButtons}>{allButtons}</div>;
  }
}

export default Dropdown;
