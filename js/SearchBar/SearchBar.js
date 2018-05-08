import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

class SearchBar extends React.PureComponent {
  static propTypes = {
    onChangeSearchText: PropTypes.func,
    searchQuery: PropTypes.string,
  };

  onClear = () => {
    this.props.onChangeSearchText('');
  };

  onSearchQueryChange = (e) => {
    this.props.onChangeSearchText(e.target.value);
  };

  render() {
    const { props } = this;
    return (
      <div className="search-container">
        <div className="image-container"><img className="search-icon-style" src="https://i.pinimg.com/originals/3a/73/81/3a7381fd9cc44c2b1dcc114ef355d274.png"/></div>
        <input
          type="text"
          placeholder='Search users by ID, address, name...'
          value={props.searchQuery}
          onChange={this.onSearchQueryChange}
          className="search-input"
        />
        {!_isEmpty(props.searchQuery) && <div onClick={this.onClear}><img className="cross-icon-style"
          src="https://i.pinimg.com/originals/eb/83/2b/eb832b1fdcecc558d4553c3143fed963.png" height="20" width="20"/></div>}
      </div>
    );
  }
}

export default SearchBar;