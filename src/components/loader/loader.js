import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "./loader.scss";

const Loader = ({ height }) => {
  return (
    <Container>
      <Grid
        container
        style={
          height ? { height: height } : { height: window.innerHeight - 50 }
        }
        alignItems={"center"}
        justify={"center"}
      >
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Grid>
    </Container>
  );
};

export default Loader;
