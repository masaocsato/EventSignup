import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class EventModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>
            <h2>{this.props.clickedEvent.EventName}</h2>
          </ModalHeader>
          <ModalBody>
            <div>
              {this.props.clickedEvent.EventStartDate}
              {this.props.clickedEvent.EventEndDate && (
                <React.Fragment>
                  {" "}
                  - {this.props.clickedEvent.EventEndDate}
                </React.Fragment>
              )}
            </div>
            <br />
            <div>{this.props.clickedEvent.EventDetails}</div>

            <div />
            <br />
            <div
              style={{
                fontSize: "10px",
                color: "lightgrey",
                textAlign: "left"
              }}
            >
              Created by:
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <button color="primary" onClick={this.props.toggle}>
              Do Something
            </button>{" "} */}
            <button color="secondary" onClick={this.props.toggle}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EventModal;
