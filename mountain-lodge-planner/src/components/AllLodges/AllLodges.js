import React, { Component } from 'react';
import LodgeCard from './LodgeCard/LodgeCard'
import classes from './AllLodges.module.css';

class AllLodges extends Component {
  state = {
    searchValue: "",
    showSearch: false,
  }

  setShowSearch = () =>
    this.setState(prevState => {
      return { showSearch: !prevState.showSearch }
    })

  setSearchValue = event =>
    this.setState({ searchValue: event.target.value.toLowerCase() })

  render() {
    let lodgeCards = (
      <div>
        <h3 className={classes.NoData}>No lodges to display</h3>
      </div>
    );

    if (this.props.lodges) {
      let lodges = this.props.lodges.filter(lodge => {
        const length = this.state.searchValue.length;
        return lodge.name.slice(0, length) === this.state.searchValue.toLowerCase()
      });

      lodgeCards = lodges.map(lodge => {
        return (
          <LodgeCard
            deleteLodge={() => this.props.deleteLodge(lodge.id)}
            updateData={this.props.updateData}
            key={lodge.id}
            data={lodge}
          />
        )
      })
    }

    const searchInputClasses = [classes.searchInput]

    !this.state.showSearch && searchInputClasses.push(classes.hide)

    const searchInput = (
      <input
        className={searchInputClasses.join(' ')}
        placeholder="Search..."
        type="text"
        value={this.state.searchValue}
        onChange={this.setSearchValue}
      />
    );

    return (
      <div className={classes.AllLodges}>
        <h2>
          <span className={classes.searchContainer}>
            <i
              className="fas fa-search"
              onClick={this.setShowSearch}
            ></i>
            {searchInput}
          </span>
          <span>All Lodges</span>
        </h2>
        <div className={classes.cards}>{lodgeCards}</div>
      </div>
    )
  }
}

export default AllLodges