import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import SearchBox from "./SearchBox";
// const google = window.google;
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 33.9803,
      lng: -118.4517449
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "600px", width: "1000px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "key" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this.props._onClick}
        >
          {this.props.events.map((event, index) => (
            <Marker
              key={event.Id}
              lat={event.Lat}
              lng={event.Lng}
              text={event.EventName}
              onClick={() => this.props.onMarkerClick(index)}
              events={this.props.events}
            />
          ))}
          <Marker
            lat={this.props.lat}
            lng={this.props.lng}
            text={"new marker"}
            // onClick={this.props.onMarkerClick}
          />
          {/* <AnyReactComponent
            lat={33.9125}
            lng={-118.563}
            text={"Kreyser Avrora"}
          /> */}
        </GoogleMapReact>
        <SearchBox />
      </div>
    );
  }
}

export default SimpleMap;
