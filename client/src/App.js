import React, { Component } from "react";
// import Calendar from "react-big-calendar";
// import DatePicker from "react-datepicker";
// import moment from "moment";
import {
  postEvent,
  getAllEvent,
  putEvent,
  deleteEvent
} from "./service/event.service";
import SearchBox from "./SearchBox";
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import EventMap from "./EventMap";
import EventModal from "./EventModal";
// import MapComponent from "./MapComponent";

// Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class App extends Component {
  state = {
    // events: [
    //   {
    //     start: new Date(),
    //     end: new Date(moment().add(1, "days")),
    //     title: "Some title"
    //   }
    // ],
    events: [],
    id: 0,
    eventName: "",
    eventStartDate: "",
    eventEndDate: "",
    eventDetails: "",
    multiDay: false,
    submitBtn: "Post",
    addNew: false,
    editMode: false,
    lat: 0,
    lng: 0,
    clickedEvent: {},
    modal: false
    // isOpen: false
  };

  componentDidMount() {
    this.getAllEvents();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  getAllEvents = () => {
    getAllEvent().then(response => {
      console.log(response);
      this.setState({
        events: response.data.resultSets[0]
      });
    });
  };

  onSelectEvent = () => {
    console.log("test");
  };

  onHandleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(event);
    this.setState({
      [name]: value
    });
  };

  handleChangeStart = date => {
    this.setState({
      eventStartDate: date
    });
  };

  handleAddNew = () => {
    this.setState({
      addNew: !this.state.addNew,
      clickedEvent: {}
    });
  };

  handleChangeEnd = date => {
    this.setState({
      eventEndDate: date
    });
  };

  handleSubmitEvent = () => {
    // this.sendCoords();
    const payload = {
      eventName: this.state.eventName,
      eventStartDate: this.state.eventStartDate,
      eventEndDate: this.state.eventEndDate,
      eventDetails: this.state.eventDetails,
      id: this.state.id,
      lat: this.state.lat,
      lng: this.state.lng
    };
    if (!this.state.editMode) {
      postEvent(payload).then(response => {
        console.log(response, "Success");
        this.getAllEvents();
        this.setState(
          {
            eventName: "",
            eventStartDate: "",
            eventEndDate: "",
            eventDetails: "",
            lat: 0,
            lng: 0,
            addNew: false,
            editMode: false
          },
          () => this.getAllEvents()
        );
      });
    } else {
      putEvent(payload).then(response => {
        console.log(response, "Success");
        this.getAllEvents();
        this.setState(
          {
            eventName: "",
            eventStartDate: "",
            eventEndDate: "",
            eventDetails: "",
            submitBtn: "Post",
            lat: 0,
            lng: 0,
            addNew: false,
            editMode: false
          },
          () => this.getAllEvents()
        );
      });
    }
  };

  _onClick = ({ x, y, lat, lng, event }) => {
    this.setState({
      lat,
      lng
    });
    console.log(x, y, lat, lng, event);
  };

  handleDeleteClick = id => {
    deleteEvent(id.Id).then(response => {
      console.log(response);
      this.getAllEvents();
    });
  };

  handleEditClick = inputs => {
    this.setState(
      {
        id: inputs.Id,
        eventName: inputs.EventName,
        eventStartDate: inputs.EventStartDate,
        eventEndDate: inputs.EventEndDate || "",
        eventDetails: inputs.EventDetails || "",
        submitBtn: "Edit",
        multiDay: false,
        lat: inputs.Lat || 0,
        lng: inputs.Lng || 0,
        addNew: true,
        editMode: true
      },
      () => this.multiDayEdit(inputs)
    );
  };

  cancelSubmitEvent = () => {
    this.setState({
      eventName: "",
      eventStartDate: "",
      eventEndDate: "",
      eventDetails: "",
      submitBtn: "Post",
      lat: 0,
      lng: 0,
      addNew: false,
      editMode: false
    });
  };

  multiDayEdit = inputs => {
    if (inputs.EventEndDate) {
      this.setState({
        multiDay: true
      });
    }
  };

  onMarkerClick = index => {
    console.log("clicked marker");
    let clickedEvent = this.state.events[index];
    this.setState({
      addNew: false,
      clickedEvent: clickedEvent
    });
    this.toggle();
  };

  // sendCoords = (lat, lng) => {
  //   this.setState({
  //     lat: lat,
  //     lng: lng
  //   });
  // };

  render() {
    return (
      <div>
        {/* <div style={{ height: "300px", display: "flex" }} className="">
          <Calendar
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: "100%", width: "100%" }}
            onSelectEvent={this.onSelectEvent}
            selectable={true}
          />
        </div> */}
        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "10px"
          }}
        >
          {this.state.addNew && (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ flex: "0 1 auto", padding: "10px" }}>
                  <label>Event Name:</label>
                  <div>
                    <input
                      type="text"
                      value={this.state.eventName}
                      name="eventName"
                      onChange={this.onHandleChange}
                    />
                  </div>
                </div>
                <div style={{ flex: "0 1 auto", padding: "10px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <input
                      type="checkbox"
                      value={this.state.multiDay}
                      name="multiDay"
                      checked={this.state.multiDay}
                      onChange={this.onHandleChange}
                    />
                    <label>Multiple Days?</label>
                  </div>
                  <label>Event Date:</label>
                  {/* <DatePicker
                    style={{ paddingLeft: "0px" }}
                    dropdownMode="select"
                    selected={moment(this.state.eventStartDate)}
                    onChange={this.handleChangeStart}
                    showTimeSelect
                    dateFormat="LLL"
                  /> */}
                  <div>
                    <input
                      type="text"
                      value={this.state.eventStartDate}
                      name="eventStartDate"
                      onChange={this.onHandleChange}
                    />
                  </div>
                </div>
                {this.state.multiDay && (
                  <React.Fragment>
                    <div style={{ flex: "0 1 auto", padding: "10px" }}>
                      <label>Event End Date:</label>
                      {/* <DatePicker
                        // inline={true}
                        dropdownMode="select"
                        minDate={this.state.eventStartDate}
                        open
                        selected={this.state.eventEndDate}
                        onChange={this.handleChangeEnd}
                      /> */}
                      <div>
                        <input
                          type="text"
                          value={this.state.eventEndDate}
                          name="eventEndDate"
                          onChange={this.onHandleChange}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                )}
                <div style={{ flex: "0 1 auto", padding: "10px" }}>
                  <label>Event Details:</label>
                  {/* <DatePicker
                    // inline={true}
                    dropdownMode="select"
                    selected={this.state.eventStartDate}
                    onChange={this.handleChangeStart}
                  /> */}
                  <div>
                    <textarea
                      rows="5"
                      value={this.state.eventDetails}
                      name="eventDetails"
                      onChange={this.onHandleChange}
                    />
                  </div>
                  <h3>Click on map to change lat/long</h3>
                  <div>Lat: {this.state.lat}</div>
                  <div>Long: {this.state.lng}</div>
                </div>
                <div>
                  <button type="button" onClick={this.handleSubmitEvent}>
                    {this.state.submitBtn}
                  </button>
                  <button type="button" onClick={this.cancelSubmitEvent}>
                    Cancel
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
          <div style={{ marginLeft: "20px", marginTop: "10px" }}>
            <div style={{ marginLeft: "5px" }}>
              <button onClick={this.handleAddNew}>Add New Event</button>
            </div>
            {this.state.events.map((item, index) => (
              <React.Fragment key={item.Id}>
                <div
                  style={{
                    border: "grey solid 1px",
                    margin: "5px",
                    padding: "20px"
                  }}
                >
                  <div>
                    Event:
                    {item.EventName}
                  </div>
                  <div>
                    Start:
                    {item.EventStartDate}
                  </div>
                  {item.EventEndDate && (
                    <div>
                      End:
                      {item.EventEndDate}
                    </div>
                  )}
                  {/* {item.EventDetails && (
                    <div>
                      Details:
                      {item.EventDetails}
                    </div>
                  )} */}
                  {/* {item.Lat && (
                    <div>
                      Lat:
                      {item.Lat}
                    </div>
                  )}
                  {item.Lng && (
                    <div>
                      Long:
                      {item.Lng}
                    </div>
                  )} */}
                  <button onClick={() => this.handleEditClick(item)}>
                    Edit
                  </button>
                  <button onClick={() => this.handleDeleteClick(item)}>
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div>
            {/* <MapComponent sendCoords={this.sendCoords} /> */}

            <SearchBox
              placeholder={"123 anywhere st."}
              onPlacesChanged={this.handleSearch}
            />
            <EventMap
              _onClick={this._onClick}
              onMarkerClick={this.onMarkerClick}
              events={this.state.events}
              editMode={this.state.addNew}
              lat={this.state.lat}
              lng={this.state.lng}
            />
          </div>
          <div
            style={
              {
                // display: "flex"
                // flexDirection: "row"
              }
            }
          >
            {/* {this.state.clickedEvent && (
              <React.Fragment>
                <h2>{this.state.clickedEvent.EventName}</h2>
                <div>
                  {this.state.clickedEvent.EventStartDate}
                  {this.state.clickedEvent.EventEndDate && (
                    <React.Fragment>
                      {" "}
                      - {this.state.clickedEvent.EventEndDate}
                    </React.Fragment>
                  )}
                </div>
                <div>{this.state.clickedEvent.EventDetails}</div>
                <div />
              </React.Fragment>
            )} */}
          </div>
        </div>
        <br />
        <br />
        <EventModal
          toggle={this.toggle}
          modal={this.state.modal}
          clickedEvent={this.state.clickedEvent}
        />
      </div>
    );
  }
}

export default App;
