import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "views/HomePage.js";

// One long page at "/" ("/portfolio" is an alias). Sections are #anchors, so no host rewrite is
// needed. Legacy routes redirect client-side to the matching section where a rewrite exists.
export const LEGACY = { "/projects": "#projects", "/history": "#education", "/contact-me": "#contact" };

export const AppRoutes = () => (
    <Switch>
        <Route exact path={["/", "/portfolio", "/index"]} component={HomePage} />
        {Object.keys(LEGACY).map((from) => (
            <Redirect key={from} exact from={from} to={{ pathname: "/", hash: LEGACY[from] }} />
        ))}
        <Redirect to="/" />
    </Switch>
);

export default AppRoutes;
