import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
const google = window.google;

export default class SearchBox extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  };
  render() {
    return (
      <input ref="input" placeholder={this.props.placeholder} type="text" />
    );
  }
  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  };
  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBoxListener = this.searchBox.addListener(
      "places_changed",
      this.onPlacesChanged
    );
  }
  componentWillUnmount() {
    google.maps.event.removeListener(this.searchBoxListener);
  }
}
