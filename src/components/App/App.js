import React, { useEffect } from "react";
import AppRouter from "./App-router";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../loader/loader";
import { getUser } from "../../actions/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import fire from "../../firebase";

const App = () => {
  const dispatch = useDispatch();
  const auth = fire.auth();
  const loading = useAuthState(auth)[1];

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
