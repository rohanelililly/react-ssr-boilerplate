import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';

import * as metadata from '../metadata';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './Home'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './about/About'),
  loading() {
    return <div>Loading...</div>;
  }
});

const App = (props) => (
  <div className="app">
    <Helmet
      title={metadata.title}
      meta={metadata.meta}
      link={metadata.link}
      script={metadata.script}
      noscript={metadata.noscript}
    />

    <nav>
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>{' '}
      <NavLink exact to="/about" activeClassName="active">
        About
      </NavLink>
    </nav>

    <div className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/about" component={LoadableAbout} />
      </Switch>
    </div>

    <footer />
  </div>
);

export default App;
