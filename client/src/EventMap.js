import React, { Component } from "react";
import {
  GoogleMap,
  // InfoWindow,
  Marker,
  withGoogleMap
} from "react-google-maps";
const google = window.google;

class EventMap extends Component {
  render() {
    const mapPosition = new google.maps.LatLng(34.0522, -118.2437);
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultZoom={11} center={{ lat: 34.0522, lng: -118.2437 }}>
        <Marker defaultIcon="assets/images/marker.png" position={mapPosition} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default EventMap;
