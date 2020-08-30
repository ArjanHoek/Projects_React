import React, { Component } from 'react';
import classes from './LodgeForm.module.css'
import HeadingSecondary from '../../components/UI/Heading/HeadingSecondary/HeadingSecondary';
import AddAdjacentLodge from '../../components/AddAdjacentLodge/AddAdjacentLodge';

import sort from '../../utilities/sort'

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/lodgeForm'

class Form extends Component {
  componentDidMount() {
    const lodge = this.props.lodges
      .find(lodge => lodge.name === this.props.match.params.id)
    lodge
      ? this.props.onSetLodgeData(lodge)
      : this.props.history.push('/')
  }

  addAdjacentLodge = event => {
    event.preventDefault();
    // const adjacentLodges = [...this.props.lodgeData.adjacentLodges]
    //   .map(i => { return { ...i } });
    // const notSelf = id => id !== this.props.id;
    // const notAddedYet = id => !this.props.lodgeData.adjacentLodges.map(i => i.id).includes(id)
    // const firstLodge = this.props.lodges.filter(lodge => notSelf(lodge.id)
    //   && notAddedYet(lodge.id))[0];
    // if (firstLodge) {
    //   adjacentLodges.push({
    //     id: firstLodge.id,
    //     outward: { hours: "", minutes: "" },
    //     return: { hours: "", minutes: "" }
    //   })
    // } else { alert("All possible lodges have already been added") }
    // const lodgeData = { ...this.props.lodgeData, adjacentLodges };
    // const newState = { ...this.state, lodgeData }
    // this.setState(newState);
  }

  editAdjacentLodge = (id, editedLodge) => {
    this.setState(prevState => {
      const adjacentLodges = [...this.props.lodgeData.adjacentLodges]
        .map(lodge => lodge.id === id ? editedLodge : lodge)
      const lodgeData = { ...prevState.lodgeData, adjacentLodges };
      const newState = { ...prevState, lodgeData };
      return { ...newState }
    })
  }

  removeAdjacentLodge = id => {
    this.setState(prevState => {
      const adjacentLodges = prevState.lodgeData.adjacentLodges.filter(item => item.id !== id);
      const lodgeData = { ...prevState.lodgeData, adjacentLodges };
      const newState = { ...prevState, lodgeData };
      return { ...newState }
    })
  }

  render() {

    const adjacentLodgeSelectors = this.props.lodgeData.adjacentLodges
      .map(item => {

        const notSelf = id => id !== this.props.id;
        const notAddedYet = id => !this.props.lodgeData.adjacentLodges.map(item => item.id).includes(id);

        const test = this.props.lodges.find(test => test.id === item.id)

        const options = sort(this.props.lodges
          .filter(item => notSelf(item.id) && notAddedYet(item.id))
          .concat(test))


        return <AddAdjacentLodge
          key={item.id}
          adjacentLodge={item}
          edit={data => this.editAdjacentLodge(item.id, data)}
          options={options}
          defaultValue={item.id}
          remove={() => this.removeAdjacentLodge(item.id)}
        />
      })

    let output = (
      <form
        className={classes.LodgeForm}
      >
        <HeadingSecondary>Edit Lodge Data</HeadingSecondary>
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
              onClick={this.addAdjacentLodge}
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
    onChangeInput: event => dispatch(actionCreators.changeInput(event.target.name, event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)