import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route, Switch, Redirect  } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './components/App';
import { ServerDataProvider } from './state/serverDataContext';

//import './styles/bootstrap';
import "./styles/bootstrap.css";
import "./styles/assets/scss/paper-dashboard.scss";
import "./styles/assets/demo/demo.css";
import "./styles/perfect-scrollbar.css";
import AdminLayout from "./layouts/Admin.jsx";


const serverData = window.__SERVER_DATA__;
delete window.__SERVER_DATA__;

export const main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <ServerDataProvider value={serverData}>
        <BrowserRouter>
       
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect to="/admin/dashboard" />
    </Switch>
        </BrowserRouter>
      </ServerDataProvider>,
      document.getElementById('root')
    );
  });
};
