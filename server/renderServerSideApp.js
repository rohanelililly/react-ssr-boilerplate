import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from '../src/components/App';
import { fetchDataForRender } from './fetchDataForRender';
import { indexHtml } from './indexHtml';
import stats from '../build/react-loadable.json';
import { ServerDataProvider } from '../src/state/serverDataContext';
import { log } from 'util';

const ServerApp = ({ context, data, location }) => {
  return (
    <ServerDataProvider value={data} session={data}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </ServerDataProvider>
  );
};

export const renderServerSideApp = (req, res) => {
  console.log(req.headers['user-agent'])
  //Loadable.preloadAll()
    //.then(() => fetchDataForRender(ServerApp, req))
    //.then(data => renderApp(ServerApp, data, req, res));
renderApp(ServerApp, {}, req, res)

};

function renderApp(ServerApp, data, req, res) {
  const context = {};
  const modules = [];
  console.log(data)
  data={...data ,...{agent:req.headers['user-agent']}}

  const markup = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ServerApp  location={req.url} data={data} context={context} />
    </Loadable.Capture>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    const fullMarkup = indexHtml({
      helmet: Helmet.renderStatic(),
      serverData: data,
      bundles: getBundles(stats, modules),
      markup
    });

    res.status(200).send(fullMarkup);
  }
}
