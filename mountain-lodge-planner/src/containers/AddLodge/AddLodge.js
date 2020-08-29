import React, { Component, Fragment } from 'react';
import classes from './AddLodge.module.css';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner'
import HeadingSecondary from '../../components/UI/Heading/HeadingSecondary/HeadingSecondary';

class Form extends Component {
  constructor() {
    super();
    this.focusInputRef = React.createRef();
    this.state = {
      lodgeData: {
        name: "",
        altitude: "",
        region: ""
      },
      formIsValid: false,
      loading: false,
      loadingMessage: "Adding data..."
    }
  }

  componentDidMount = () => { this.focusInputRef.current.focus() }

  submitHandler = event => {
    if (event.key && event.key !== "Enter") { return }
    event.preventDefault();
    this.setState({ loading: true })
    const lodgeData = { ...this.state.lodgeData }
    axios.post('/lodges.json', lodgeData)
      .then(() => {
        for (let p in lodgeData) { lodgeData[p] = "" }
        this.setState({ lodgeData, loading: false });
        this.props.updateData(this.state.loadingMessage)
      }).catch(err => console.log(err));
  }

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        lodgeData: {
          ...prevState.lodgeData, [name]: value.toLowerCase()
        }
      }
    })
  }

  render() {
    let output = (
      <Fragment>
        <form className={classes.Form} onKeyDown={this.submitHandler}>
          <HeadingSecondary>Add New Lodge</HeadingSecondary>
          <div>
            <label>Name</label>
            <input
              ref={this.focusInputRef}
              type="text"
              name="name"
              value={this.state.lodgeData.name}
              onChange={this.changeHandler}
              placeholder="Name..."
            />
          </div>
          <div>
            <label>Altitude</label>
            <input
              type="text"
              name="altitude"
              value={this.state.lodgeData.altitude}
              onChange={this.changeHandler}
              placeholder="Altitude..."
            />        </div>
          <div>
            <label>Region</label>
            <input
              type="text"
              name="region"
              value={this.state.lodgeData.region}
              onChange={this.changeHandler}
              placeholder="Region..."
            />
          </div>
        </form>
        <div className={classes.Buttons}>
          <button onClick={() => this.props.history.goBack()}
            className={classes.previousButton}><i className="fas fa-chevron-left fa-2x"></i></button>
          <button onClick={this.submitHandler} className={classes.addButton}>
            <i className="fas fa-plus-square fa-2x"></i>
          </button>
        </div>
      </Fragment>
    )

    this.state.loading && (output = <Spinner>{this.state.loadingMessage}</Spinner>)


    return output
  }
}

export default Form