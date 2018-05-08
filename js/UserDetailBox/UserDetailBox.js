import React from 'react';
import PropTypes from 'prop-types';
import _toLower from 'lodash/toLower';

class UserDetailBox extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    searchQuery: PropTypes.string,
  };

  renderUserAttr = attr => {
    const { props: { searchQuery } } = this;
    const index = _toLower(attr).indexOf(_toLower(searchQuery));
    if (index >= 0) {
      return {__html: attr.substring(0,index) + "<span class='highlight'>" + attr.substring(index,index+searchQuery.length) + "</span>" + attr.substring(index + searchQuery.length)};
    }
    return {__html: attr};
  };

  render() {
    const { props } = this;
    return (
      <div className="user-desc">
        <div id="user-id" className="user-id" dangerouslySetInnerHTML={this.renderUserAttr(props.id)} />
        <div id="user-name" className="user-name" dangerouslySetInnerHTML={this.renderUserAttr(props.name)} />
        <div id="user-address" className="user-address" dangerouslySetInnerHTML={this.renderUserAttr(props.address)} />
      </div>
    );
  }
}

export default UserDetailBox;