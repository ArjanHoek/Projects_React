import React, { Component, Fragment } from 'react'
import classes from './EditLodge.module.css'
import axios from '../../axios'
import AddAdjacentLodge from '../AddAdjacentLodge/AddAdjacentLodge'


class EditLodge extends Component {
  state = {
    lodgeData: {
      name: "",
      altitude: "",
      region: "",
      adjacentLodges: []
    },
    lodges: [],
    id: "",
    editAllowed: false,
    error: null,
  }

  checkInputValidity = state => true

  componentDidMount() {
    const lodge = this.props.lodges.find(lodge =>
      lodge.name === this.props.match.params.id)
    let adjacentLodges = []
    if (lodge.adjacentLodges) {
      adjacentLodges = lodge.adjacentLodges.map(i => { return { ...i } })
    }
    this.setState({
      id: lodge.id,
      lodgeData: {
        name: lodge.name,
        altitude: lodge.altitude,
        region: lodge.region,
        adjacentLodges: adjacentLodges || []
      }
    })
  }

  deleteHandler = () => {
    if (this.props.deleteLodge(this.state.id)) {
      this.props.history.goBack()
    }
  }

  submitHandler = event => {
    event.preventDefault();
    if (this.props.setLoading('Editing data...')) {
      this.props.history.goBack()
    }
    axios.get('/lodges.json')
      .then(res => {
        for (let key in res.data) {
          if (!res.data[key].adjacentLodges) {
            res.data[key].adjacentLodges = []
          }
          const filteredAdjacentLodges = res.data[key].adjacentLodges
            .filter(lodge => lodge.id !== this.state.id)
          res.data[key].adjacentLodges = filteredAdjacentLodges
        }
        if (res.data[this.state.id]) {
          res.data[this.state.id] = this.state.lodgeData
          this.state.lodgeData.adjacentLodges.forEach(adjLodge => {
            res.data[adjLodge.id].adjacentLodges.push({
              id: this.state.id,
              outward: adjLodge.return,
              return: adjLodge.outward
            })
          })
        }
        axios.put('/lodges.json', res.data)
          .then(() => this.props.updateData())
          .catch(error => this.setState({ error }));

      })
  }

  //Responds only to name/altitude/region
  inputChangeHandler = event => {
    const newState = { ...this.state };
    newState.lodgeData[event.target.name] = event.target.value;
    newState.editAllowed = this.checkInputValidity(newState)
    this.setState(newState)
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
    newState.editAllowed = this.checkInputValidity(newState);
    this.setState(newState);
  }

  editAdjacentLodge = (id, editedLodge) => {
    this.setState(prevState => {
      const adjacentLodges = [...this.state.lodgeData.adjacentLodges]
        .map(lodge => lodge.id === id ? editedLodge : lodge)
      const lodgeData = { ...prevState.lodgeData, adjacentLodges };
      const newState = { ...prevState, lodgeData };
      return { ...newState, editAllowed: this.checkInputValidity(newState) }
    })
  }

  removeAdjacentLodge = id => {
    this.setState(prevState => {
      const adjacentLodges = prevState.lodgeData.adjacentLodges.filter(item => item.id !== id);
      const lodgeData = { ...prevState.lodgeData, adjacentLodges };
      const newState = { ...prevState, lodgeData };
      return { ...newState, editAllowed: this.checkInputValidity(newState) }
    })
  }

  compare = (a, b) => a > b ? 1 : a < b ? -1 : 0

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

    let output = (
      <Fragment>
        <form
          className={classes.EditLodge}
        >
          <h2 className={classes.Heading}>Edit lodge info</h2>
          <div className={classes.InputControl}>
            <label>Name</label>
            <input
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
        <div className={classes.Buttons}>
          <button
            onClick={() => this.props.history.goBack()}
            className={classes.previousButton}
          >
            <i className="fas fa-chevron-left fa-2x"></i>
          </button>
          <button
            onClick={this.submitHandler}
            disabled={!this.state.editAllowed}
            className={classes.editButton}
          >
            <i className="fas fa-save fa-2x"></i>
          </button>
          <button
            onClick={this.deleteHandler}
            className={classes.deleteButton}
          >
            <i className="fas fa-trash-alt fa-2x"></i>
          </button>
        </div>
      </Fragment>
    )

    this.state.error && (output = <h3>ERROR</h3>)

    return output
  }
}

export default EditLodge