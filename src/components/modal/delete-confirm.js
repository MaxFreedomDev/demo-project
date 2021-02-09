import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px 0",
  },
  btn: {
    width: 160,
    height: 32,
    cursor: "pointer",
    borderRadius: 5,
    color: "#FFFFFF",
    fontSize: 14,
    border: "none",
    outline: "none",
  },
  del: {
    backgroundColor: "#FF0000",
    "&:hover": {
      backgroundColor: "#dc3545",
    },
  },
  cancel: {
    backgroundColor: "#cfcec8",
    "&:hover": {
      backgroundColor: "#bfbeba",
    },
  },
}));

const DeleteConfirm = ({ open, label, onDelete, onClose }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} fullWidth maxWidth={"xs"}>
      <DialogTitle className={classes.title}>{`Удалить ${label}?`}</DialogTitle>
      <DialogActions className={classes.actions}>
        <button onClick={onDelete} className={clsx(classes.btn, classes.del)}>
          Удалить
        </button>
        <button
          onClick={() => onClose(!open)}
          className={clsx(classes.btn, classes.cancel)}
        >
          Отмена
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
