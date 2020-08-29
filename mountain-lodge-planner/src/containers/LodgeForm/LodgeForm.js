import React, { Component } from 'react';
import classes from './LodgeForm.module.css'
import HeadingSecondary from '../../components/UI/Heading/HeadingSecondary/HeadingSecondary';
import AddAdjacentLodge from '../../components/AddAdjacentLodge/AddAdjacentLodge';

class Form extends Component {
  state = {
    lodgeData: {
      name: "",
      altitude: "",
      region: "",
      adjacentLodges: []
    },
  }

  componentDidMount() {
    const lodge = this.props.lodges
      .find(lodge => lodge.name === this.props.paramsID)

    lodge && this.setState({
      id: lodge.id,
      lodgeData: {
        name: lodge.name,
        altitude: lodge.altitude,
        region: lodge.region,
        adjacentLodges: lodge.adjacentLodges
          ? lodge.adjacentLodges.map(i => { return { ...i } })
          : []
      }
    })
  }

  compare = (a, b) => a > b ? 1 : a < b ? -1 : 0

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      const lodgeData = { ...prevState.lodgeData, [name]: value }
      return { ...prevState, lodgeData }
    })
  }

  addAdjacentLodge = event => {
    event.preventDefault();
    const adjacentLodges = [...this.state.lodgeData.adjacentLodges]
      .map(i => { return { ...i } });
    const notSelf = id => id !== this.state.id;
    const notAddedYet = id => !this.state.lodgeData.adjacentLodges.map(i => i.id).includes(id)
    const firstLodge = this.props.lodges.filter(lodge => notSelf(lodge.id)
      && notAddedYet(lodge.id))[0];
    if (firstLodge) {
      adjacentLodges.push({
        id: firstLodge.id,
        outward: { hours: "", minutes: "" },
        return: { hours: "", minutes: "" }
      })
    } else { alert("All possible lodges have already been added") }
    const lodgeData = { ...this.state.lodgeData, adjacentLodges };
    const newState = { ...this.state, lodgeData }
    this.setState(newState);
  }

  editAdjacentLodge = (id, editedLodge) => {
    this.setState(prevState => {
      const adjacentLodges = [...this.state.lodgeData.adjacentLodges]
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

    const adjacentLodgeSelectors = this.state.lodgeData.adjacentLodges
      .map(item => {

        const notSelf = id => id !== this.state.id;
        const notAddedYet = id => !this.state.lodgeData.adjacentLodges.map(item => item.id).includes(id);

        const test = this.props.lodges.find(test => test.id === item.id)

        const options = this.props.lodges
          .filter(item => notSelf(item.id) && notAddedYet(item.id))
          .concat(test).sort((a, b) => this.compare(a.name, b.name))


        return <AddAdjacentLodge
          key={item.id}
          adjacentLodge={item}
          edit={data => this.editAdjacentLodge(item.id, data)}
          options={options}
          defaultValue={item.id}
          remove={() => this.removeAdjacentLodge(item.id)}
        />
      })

    return (
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
            value={this.state.lodgeData.name}
            onChange={this.inputChangeHandler}
            placeholder="Name..."
          />
        </div>
        <div className={classes.InputControl}>
          <label>Altitude</label>
          <input
            className={classes.InputField}
            type="text"
            name="altitude"
            value={this.state.lodgeData.altitude}
            onChange={this.inputChangeHandler}
            placeholder="Altitude..."
          />
        </div>
        <div className={classes.InputControl}>
          <label>Region</label>
          <input
            className={classes.InputField}
            type="text"
            name="region"
            value={this.state.lodgeData.region}
            onChange={this.inputChangeHandler}
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
  }
}

export default Form