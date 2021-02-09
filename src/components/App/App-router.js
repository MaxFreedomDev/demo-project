import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../routes";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/const";
import Row from "../row/row";
import { useSelector } from "react-redux";

const AppRouter = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <Row>
      <Switch>
        {privateRoutes.map(({ path, Component }) => (
          <Route path={path} component={Component} exact={true} key={path} />
        ))}
        <Redirect to={MAIN_ROUTE} />
      </Switch>
    </Row>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} key={path} />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
