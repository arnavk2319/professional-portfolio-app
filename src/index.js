/*

=========================================================
* Now UI Kit React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
// pages for this kit
import PortfolioPage from "views/examples/PortfolioPage.js"
import ProjectsPage from "views/examples/ProjectsPage.js";
import HistoryPage from "views/examples/HistoryPage.js";
import ContactPage from "views/examples/ContactPage.js";
import CertificationsPage from "views/examples/CertificationsPage.js";
import PageTracker from "PageTracker.js";

ReactDOM.render(
  <BrowserRouter>
    <PageTracker />
    <Switch>
      <Switch>
        <Redirect from="/index" to="/portfolio" />
        <Route
          path="/portfolio"
          render={(props) => <PortfolioPage {...props} />}
        />
        <Route
          path="/projects"
          render={(props) => <ProjectsPage {...props} />}
        />
        <Route
          path="/certifications"
          render={(props) => <CertificationsPage {...props} />}
        />
        <Route
          path="/history"
          render={(props) => <HistoryPage {...props} />}
        />
        <Route
          path="/contact-me"
          render={(props) => <ContactPage {...props} />}
        />
        <Redirect to="/portfolio" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
