import React, { Component } from 'react';
import classes from './LodgeForm.module.css'
import AddAdjacentLodge from '../../components/AddAdjacentLodge/AddAdjacentLodge';

import sort from '../../utilities/sort'

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/lodgeForm'

class Form extends Component {
  componentDidMount() {
    if (this.props.paramsID) {
      console.log('test');
      const lodge = this.props.lodges
        .find(lodge => lodge.name === this.props.paramsID)
      lodge
        ? this.props.onSetLodgeData(lodge)
        : this.props.history.push('/')
    }

  }

  render() {

    const adjacentLodgeSelectors = this.props.lodgeData.adjacentLodges
      .map(item => {

        const notSelf = id => id !== this.props.id;
        const notAddedYet = id => !this.props.lodgeData.adjacentLodges.map(item => item.id).includes(id);

        const test = this.props.lodges.find(lodge => lodge.id === item.id)

        const options = sort(this.props.lodges
          .filter(i => notSelf(i.id) && notAddedYet(i.id))
          .concat(test))


        return <AddAdjacentLodge
          key={item.id}
          adjacentLodge={item}
          options={options}
        />
      })

    let output = (
      <form
        className={classes.LodgeForm}
      >
        <div className={classes.InputControl}>
          <label>Name</label>
          <input
            className={classes.InputField}
            type="text"
            name="name"
            value={this.props.lodgeData.name}
            onChange={this.props.onChangeInput}
            placeholder="Name..."
          />
        </div>
        <div className={classes.InputControl}>
          <label>Altitude</label>
          <input
            className={classes.InputField}
            type="text"
            name="altitude"
            value={this.props.lodgeData.altitude}
            onChange={this.props.onChangeInput}
            placeholder="Altitude..."
          />
        </div>
        <div className={classes.InputControl}>
          <label>Region</label>
          <input
            className={classes.InputField}
            type="text"
            name="region"
            value={this.props.lodgeData.region}
            onChange={this.props.onChangeInput}
            placeholder="Region..."
          />
        </div>

        <div className={classes.InputControl}>
          <label>Adjacent Lodges</label>
          <div className={classes.InputContainer}>
            {adjacentLodgeSelectors}

            <button
              onClick={event => {
                event.preventDefault();
                this.props.onAddAdjacentLodge(this.props.lodges)
              }}
            >
              <i className="fas fa-plus-square fa-2x"></i>
            </button>
          </div>
        </div>
      </form>
    )

    return output
  }
}

const mapStateToProps = state => {
  return {
    lodges: state.lodges.lodges,
    loading: state.lodges.loading,
    lodgeData: state.lodgeForm.lodgeData,
    id: state.lodgeForm.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetLodgeData: lodge => dispatch(actionCreators.setLodgeData(lodge)),
    onChangeInput: event => dispatch(actionCreators.changeInput(event.target.name, event.target.value)),
    onAddAdjacentLodge: lodges => dispatch(actionCreators.addAdjacentLodge(lodges))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)