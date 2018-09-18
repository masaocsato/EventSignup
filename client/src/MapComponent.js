import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import withScriptjs from "react-google-maps/lib/async/withScriptjs";
const google = window.google;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    fields: {
      location: {
        lat: 0,
        lng: 0
      }
    },
    currentLocation: {
      lat: 0,
      lng: 0
    }
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  async componentDidMount() {
    const { lat, lng } = await this.getcurrentLocation();
    this.setState(
      prev => ({
        fields: {
          ...prev.fields,
          location: {
            lat,
            lng
          }
        },
        currentLocation: {
          lat,
          lng
        }
      })
      // () => this.props.sendCoords(lat, lng)
    );
  }

  getcurrentLocation() {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0
    };
  }

  addMarker = (location, map) => {
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location
      }
    }));
    // map.panTo(location);
  };

  handleClick = event => {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    console.log(lat, lng);
  };

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Map
          style={{
            minWwidth: "200px",
            minHeight: "200px",
            height: `650px`,
            width: "1000px"
          }}
          google={this.props.google}
          zoom={11}
          onClick={this.props._onClick}
          // center={{ lat: 34.0522, lng: -118 }}
          // onClick={(t, map, c) => this.addMarker(c.latLng, map)}
          // onClick={e => this.handleClick(e)}
        >
          <Marker
            onClick={this.onMarkerClick}
            icon={{
              url: "/img/icon.svg",
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(64, 64)
            }}
            name={"Event location"}
            position={this.state.fields.location}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyD7iu5CfoFeysqETwfFNxbBnnwupWKewWU",
  v: "3"
})(MapContainer);
