import React from 'react'
import classes from './Input.module.css';

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.type) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.change}
        name={props.name}
        {...props.config}
      />
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.change}
        name={props.name}
        {...props.config}
      />
      break;
    case ('select'):
      inputElement = <select
        className={inputClasses.join(' ')}
        onChange={props.change}
        name={props.name}
      >
        {
          props.config.options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >{option.value}</option>
          ))
        }
      </select>
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.change}
        {...props.config}
      />
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )

}



export default input