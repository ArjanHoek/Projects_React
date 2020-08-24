import React, { Component } from 'react'
import classes from './LodgeCard.module.css';
import { Link } from 'react-router-dom';

class Lodge extends Component {


  render() {
    const lodge = (
      <div className={classes.LodgeCard}>
        <div className={classes.iconsContainer}>
          <Link to={{
            pathname: `/edit/${this.props.data.name}`,
            lodgeID: this.props.data.id
          }}>
            <i
              className={`fas fa-pencil-alt ${classes.edit}`}>
            </i>
          </Link>
          <i
            onClick={this.props.deleteLodge}
            className={`fas fa-trash-alt ${classes.delete}`}>
          </i>
        </div>
        <div className={classes.HeadingContainer}>
          <h3>{this.props.data.name}</h3>
        </div>
        <div className={classes.info}>
          <p><i className="fas fa-image"></i> {this.props.data.region}</p>
          <p><i className="fas fa-arrow-circle-up"></i> {this.props.data.altitude}m</p>
        </div>


      </div>
    )
    return lodge
  }
}

export default Lodge