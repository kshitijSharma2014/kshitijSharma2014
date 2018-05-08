import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import {userDetails} from './dummyData';

import _filter from 'lodash/filter';
import _toLower from 'lodash/toLower';

class UniversalSearch extends React.Component {

  constructor(props) {
    super(props);
    this.filteredUserDetails = userDetails;
    this.state = {
      searchQuery: '',
    };
  };

  onChangeSearchText = searchQuery => {
    this.filteredUserDetails = this.getFilteredProducts(searchQuery);
    this.setState({ searchQuery });
  };

  getFilteredProducts = searchQuery => {
    console.log("searchQuery", searchQuery);
    const lowerCaseSearchQuery = _toLower(searchQuery);
    console.log("lowerCaseSearchQuery", lowerCaseSearchQuery);

    return _filter(userDetails, (userDetail) =>
    _toLower(userDetail.name).indexOf(lowerCaseSearchQuery) > -1 ||
      _toLower(userDetail.id).indexOf(lowerCaseSearchQuery) > -1 || _toLower(userDetail.address).indexOf(lowerCaseSearchQuery) > -1
  )};

  render() {
    return (
      <div className="app-body">
        <SearchBar
          onChangeSearchText={this.onChangeSearchText}
          searchQuery={this.state.searchQuery}
        />
        <SearchResults
          userDetails={this.filteredUserDetails}
          searchQuery={this.state.searchQuery}
        />
      </div>
    );
  }
};

ReactDOM.render(
  <UniversalSearch/>,
  document.getElementById('container')
);