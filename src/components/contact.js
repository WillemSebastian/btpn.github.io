import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Modal from "../components/modal";

function Contact(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteContact() {
    const url =
      "https://simple-contact-crud.herokuapp.com/contact/" + props.item.id;
    const response = await fetch(url, {
      method: "DELETE",
      header: {
        Accept: "Application/json",
        ContentType: "Application/json"
      }
    });
    const data = await response.json();
    if (response.status === 201) {
      props.setAlertMessage("Success delete contact");
      props.openSuccessAlert();
      props.getContact();
    } else {
      props.setAlertMessage(data.message);
      props.openFailAlert();
    }
  }

  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={props.item.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={props.item.firstName + " " + props.item.lastName}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Age: {props.item.age}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleClickOpen()}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteContact()}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
      <Modal
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        isModalOpen={open}
        openSuccessAlert={props.openSuccessAlert}
        openFailAlert={props.openFailAlert}
        setAlertMessage={props.setAlertMessage}
        getContact={props.getContact}
        status="edit"
        data={props.item}
      />
    </List>
  );
}

export default Contact;
