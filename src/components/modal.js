import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function Modal(props) {
  const [firstName, changeFirstName] = React.useState(
    props.status === "edit" ? props.data.firstName : ""
  );
  const [lastName, changeLastName] = React.useState(
    props.status === "edit" ? props.data.lastName : ""
  );
  const [age, changeAge] = React.useState(
    props.status === "edit" ? props.data.age : ""
  );
  const [photo, changePhoto] = React.useState(
    props.status === "edit" ? props.data.photo : ""
  );
  const submit = async () => {
    var form = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: photo
    };

    if (props.status === "add") {
      const url = "/contact";
      const response = await fetch(url, {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(form)
      });
      if (response.status === 201) {
        props.setAlertMessage("Success create contact");
        props.openSuccessAlert();
        props.getContact();
      } else {
        props.setAlertMessage("Fail create contact");
        props.openFailAlert();
      }
    } else {
      const url = "/contact/" + props.data.id;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(form)
      });
      if (response.status === 201) {
        props.setAlertMessage("Success edit contact");
        props.openSuccessAlert();
        props.getContact();
      } else {
        props.setAlertMessage("Fail edit contact");
        props.openFailAlert();
      }
    }
    props.handleClose();
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          onChange={e => changeFirstName(e.target.value)}
          value={firstName}
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          onChange={e => changeLastName(e.target.value)}
          value={lastName}
        />
        <TextField
          margin="dense"
          id="age"
          label="Age"
          type="number"
          fullWidth
          onChange={e => changeAge(e.target.value)}
          value={age}
        />
        <TextField
          margin="dense"
          id="photo"
          label="Photo"
          type="text"
          fullWidth
          onChange={e => changePhoto(e.target.value)}
          value={photo}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} color="primary">
          Submit
        </Button>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
