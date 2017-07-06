import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Redirect, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import routes from './routes';
import './style.scss';

require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');

injectTapEventPlugin();
// const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(

        <Router history={browserHistory}>
            <Redirect from="/" to="search" />
            {routes}
        </Router>,
    document.getElementById('root')
);
