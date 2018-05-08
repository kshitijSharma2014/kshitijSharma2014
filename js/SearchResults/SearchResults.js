import React from 'react';
import PropTypes from 'prop-types';
import NoUserFound from '../NoUserFound';
import UserDetailBox from '../UserDetailBox';

import _isEmpty from 'lodash/isEmpty';

class SearchResults extends React.Component {
  static propTypes = {
    userDetails: PropTypes.array,
    searchQuery: PropTypes.string,
  };

  state = {
    isFocused: true,
  };

  onFocusChange = (isFocused) => {
    this.setState({isFocused});
  };

  userDetailsRenderer = (userDetail, index) => {
    return (
        <UserDetailBox
          id={userDetail.id}
          name={userDetail.name}
          address={userDetail.address}
          searchQuery={this.props.searchQuery}
          index={index}
          lastIndex={this.props.userDetails.length}
          isFocused={this.state.isFocused}
          onFocusChange={this.onFocusChange}
        />
    )
  };

  render() {
    const { props: { userDetails } } = this;
    if (_isEmpty(userDetails)) {
      return (
        <NoUserFound/>
      );
    }
    const userDetailsNode = userDetails.map(this.userDetailsRenderer);
    return (
      <div className="options-body">
        {userDetailsNode}
      </div>
    );
  }
}

export default SearchResults;