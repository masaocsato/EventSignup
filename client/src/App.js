import React, { Component } from "react";
import Calendar from "react-big-calendar";
// import DatePicker from "react-datepicker";
import moment from "moment";
import {
  postEvent,
  getAllEvent,
  putEvent,
  deleteEvent
} from "./service/event.service";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
// import EventMap from "./EventMap";
import MapComponent from "./MapComponent";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

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
    addNew: false
  };

  componentDidMount() {
    this.getAllEvents();
  }

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
      addNew: !this.state.addNew
    });
  };

  handleChangeEnd = date => {
    this.setState({
      eventEndDate: date
    });
  };

  handleSubmitEvent = () => {
    const payload = {
      eventName: this.state.eventName,
      eventStartDate: this.state.eventStartDate,
      eventEndDate: this.state.eventEndDate,
      eventDetails: this.state.eventDetails,
      id: this.state.id
    };
    if (this.state.submitBtn === "Post") {
      postEvent(payload).then(response => {
        console.log(response, "Success");
        this.getAllEvents();
        this.setState({
          eventName: "",
          eventStartDate: "",
          eventEndDate: "",
          eventDetails: ""
        });
      });
    } else {
      putEvent(payload).then(response => {
        console.log(response, "Success");
        this.getAllEvents();
        this.setState({
          eventName: "",
          eventStartDate: "",
          eventEndDate: "",
          eventDetails: "",
          submitBtn: "Post"
        });
      });
    }
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
        multiDay: false
      },
      () => this.multiDayEdit(inputs)
    );
  };

  multiDayEdit = inputs => {
    if (inputs.EventEndDate) {
      this.setState({
        multiDay: true
      });
    }
  };

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
                // inline={true}
                dropdownMode="select"
                selected={this.state.eventStartDate}
                onChange={this.handleChangeStart}
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
                      <label>Event Name:</label>
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
                </div>
                <div>
                  <button type="button" onClick={this.handleSubmitEvent}>
                    {this.state.submitBtn}
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
                  {item.EventDetails && (
                    <div>
                      Details:
                      {item.EventDetails}
                    </div>
                  )}
                  <button onClick={() => this.handleEditClick(item)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => this.handleDeleteClick(item)}>
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div>
            <MapComponent />
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
