import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { useDispatch } from "react-redux";
import { createEvent } from "../../actions/products";
import DialogTitle from "@material-ui/core/DialogTitle";

const Success = ({ open, label }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(createEvent(false));
    }, 1000);
  }, [dispatch]);
  return (
    <Dialog open={open} fullWidth maxWidth={"xs"}>
      <DialogTitle style={{ textAlign: "center" }}>{label}</DialogTitle>
    </Dialog>
  );
};

export default Success;
