import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from 'react-router-dom';
import App from './App';
import history from './config/history';
import './i18n';
import MuiPickersProvider from './MuiPickerProvider';
import GlobalContext from './globalContexts';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <GlobalContext>
      <MuiPickersProvider>
        <Router history={history}>
          <App />
        </Router>
      </MuiPickersProvider>
    </GlobalContext>,
    MOUNT_NODE,
  );
};

render(App);

if (module.hot) {
  // Hot reloadable React components and Context
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./App', './globalContexts'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
