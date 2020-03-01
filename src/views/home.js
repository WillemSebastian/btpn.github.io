import React from "react";
import Contact from "../components/contact";
import Icon from "@material-ui/core/Icon";
import Modal from "../components/modal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalOpen: false,
      successAlertOpen: false,
      alertMessage: "true",
      failAlertOpen: false
    };
  }

  componentDidMount = () => {
    this.getContact();
  };

  handleClickOpen = () => {
    this.setState({ isModalOpen: true });
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
  };

  setAlertMessage = text => {
    this.setState({ alertMessage: text });
  };

  openSuccessAlert = () => {
    this.setState({ successAlertOpen: true });
  };

  openFailAlert = () => {
    this.setState({ failAlertOpen: true });
  };

  getContact = async () => {
    const url = "/contact";
    const response = await fetch(url, {
      method: "GET"
    });
    const data = await response.json();
    this.setState({ data: data.data });
  };

  renderContactList = () => {
    return this.state.data.length
      ? this.state.data.map(_ => {
          return (
            <Contact
              item={_}
              key={_.id}
              openSuccessAlert={this.openSuccessAlert}
              openFailAlert={this.openFailAlert}
              setAlertMessage={this.setAlertMessage}
              getContact={this.getContact}
            />
          );
        })
      : null;
  };

  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="headerContactList">
            <div>&nbsp;</div>
            <div>Contact List</div>
            <Icon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={this.handleClickOpen}
            >
              add_circle
            </Icon>
          </div>
          <div className="contactCard">{this.renderContactList()}</div>
        </div>
        <Modal
          handleClose={this.handleClose}
          handleClickOpen={this.handleClickOpen}
          isModalOpen={this.state.isModalOpen}
          status="add"
          openSuccessAlert={this.openSuccessAlert}
          openFailAlert={this.openFailAlert}
          setAlertMessage={this.setAlertMessage}
          getContact={this.getContact}
        />
        <Snackbar open={this.state.successAlertOpen} autoHideDuration={3000}>
          <Alert severity="success">{this.state.alertMessage}</Alert>
        </Snackbar>
        <Snackbar open={this.state.failAlertOpen} autoHideDuration={3000}>
          <Alert severity="error">{this.state.alertMessage}</Alert>
        </Snackbar>
      </div>
    );
  }
}
