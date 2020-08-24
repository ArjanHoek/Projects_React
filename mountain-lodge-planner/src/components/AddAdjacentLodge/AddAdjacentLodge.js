import React, { Component } from 'react'
import classes from './AddAdjacentLodge.module.css'

class AddAdjacentLodge extends Component {
  selectChangeHandler = event => {
    const { name, value } = event.target;
    this.props.edit({
      ...this.props.adjacentLodge,
      [name]: value
    })
  }

  inputChangeHandler = (event, type) => {
    const { name, value } = event.target;
    const duration = { ...this.props.adjacentLodge[name] };
    duration[type] = value;
    const newState = { ...this.props.adjacentLodge, [name]: duration }
    this.props.edit(newState)
  }

  render() {
    const options = this.props.options.map(item => (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    ))

    return (
      <div className={classes.AddAdjacentLodge}>
        <div className={classes.SelectContainer}>
          <select
            name="id"
            onChange={this.selectChangeHandler}
            defaultValue={this.props.defaultValue}
          >{options}</select>
          <i
            className="fas fa-times"
            onClick={this.props.remove}
          ></i>
        </div>

        <div className={classes.DurationContainer}>
          <div className={classes.InputContainer}>
            <div className={classes.IconsContainer}>
              <i className="fas fa-clock"></i>
              <p>Outward</p>
              <i className="fas fa-arrow-right"></i>
            </div>
            <div className={classes.SingleInput}>
              <input
                name='outward'
                value={this.props.adjacentLodge.outward.hours}
                placeholder='time...'
                onChange={event => this.inputChangeHandler(event, 'hours')}
              />
              <p className={classes.InputAnnotation}>hours</p>
            </div>
            <div className={classes.SingleInput}>
              <input
                name='outward'
                value={this.props.adjacentLodge.outward.minutes}
                placeholder='time...'
                onChange={event => this.inputChangeHandler(event, 'minutes')}
              />
              <p className={classes.InputAnnotation}>minutes</p>
            </div>
          </div>

          <div className={classes.InputContainer}>
            <div className={classes.IconsContainer}>
              <i className="fas fa-clock"></i>
              <p>Return</p>
              <i className="fas fa-arrow-left"></i>
            </div>
            <div className={classes.SingleInput}>
              <input
                name='return'
                value={this.props.adjacentLodge.return.hours}
                placeholder='time...'
                onChange={event => this.inputChangeHandler(event, 'hours')}
              />
              <p className={classes.InputAnnotation}>hours</p>
            </div>
            <div className={classes.SingleInput}>
              <input
                name='return'
                value={this.props.adjacentLodge.return.minutes}
                placeholder='time...'
                onChange={event => this.inputChangeHandler(event, 'minutes')}
              />
              <p className={classes.InputAnnotation}>minutes</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default AddAdjacentLodge