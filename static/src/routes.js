/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
i
import NotFound from './components/NotFound';

import { DetermineAuth } from './components/DetermineAuth';


export default (
    <Route path="/" component={App}>
        <Route path="home" component={requireNoAuthentication(HomeContainer)} />
        <Route path="*" component={DetermineAuth(NotFound)} />
    </Route>
);
