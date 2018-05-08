import React from 'react';
import PropTypes from 'prop-types';
import _toLower from 'lodash/toLower';

class UserDetailBox extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    searchQuery: PropTypes.string,
    index: PropTypes.number,
    lastIndex: PropTypes.number,
    isFocused: PropTypes.bool,
    onFocusChange: PropTypes.func,
  };

  componentDidMount() {
    if (this.props.index === 0) {
      this.refs[this.props.index].focus();
      this.refs[this.props.index].classList.add('user-desc-onActive');
    }
  }

  renderUserAttr = attr => {
    const { props: { searchQuery } } = this;
    const index = _toLower(attr).indexOf(_toLower(searchQuery));
    if (index >= 0) {
      return { __html: attr.substring(0, index) + "<span class='highlight'>" + attr.substring(index, index + searchQuery.length) + "</span>" + attr.substring(index + searchQuery.length) };
    }
    return { __html: attr };
  };

  addClassToTarget = targetId => {
    document.getElementById(`${targetId}`).classList.add('user-desc-onActive');
  };

  removeClassFromTarget = targetId => {
    document.getElementById(`${targetId}`).classList.remove('user-desc-onActive');
  };

  onKeyPress = e => {
    const targetId = +e.target.id;
    if (e.which === 38 && +e.target.id > 0) {
      this.removeClassFromTarget(targetId);
      this.addClassToTarget(targetId - 1);
      document.getElementById(`${targetId - 1}`).focus();
      this.props.onFocusChange(true);
    } else if (e.which === 40 && targetId < this.props.lastIndex - 1) {
      this.removeClassFromTarget(targetId);
      this.addClassToTarget(targetId + 1);
      document.getElementById(`${targetId + 1}`).focus();
      this.props.onFocusChange(true);
    }
  };

  onBlur = () => {
    this.removeClassFromTarget(this.props.index);
    this.props.onFocusChange(false);
  };

  onClickUser = e => {
    this.props.onFocusChange(true);
    this.addClassToTarget(this.props.index);
    e.target.focus();
  };

  hoverEvent = () => {
    if (!this.props.isFocused) {
      this.addClassToTarget(this.props.index);
    }
  };

  onMouseLeaveEvent = () => {
    if (!this.props.isFocused) {
      this.removeClassFromTarget(this.props.index);
    }
  };

  render() {
    const { props } = this;
    return (
      <div
        id={props.index}
        className="user-desc"
        onClick={this.onClickUser}
        onMouseEnter={this.hoverEvent}
        onMouseLeave={this.onMouseLeaveEvent}
        onKeyDown={this.onKeyPress}
        onBlur={this.onBlur}
        tabIndex={this.props.index}
        autoFocus={props.index === 0}
        ref={this.props.index}
      >
        <div className="user-id" dangerouslySetInnerHTML={this.renderUserAttr(props.id)}/>
        <div className="user-name" dangerouslySetInnerHTML={this.renderUserAttr(props.name)}/>
        <div className="user-address" dangerouslySetInnerHTML={this.renderUserAttr(props.address)}/>
      </div>
    );
  }
}

export default UserDetailBox;