/* eslint new-cap: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import NotFound from './components/NotFound';


export default (
    <Route path="/" component={App}>
				<IndexRoute component={HomeContainer}/>
        <Route path="home" component={HomeContainer} />
				<Route path="search" component={HomeContainer} />
        <Route path="*" component={NotFound} />
    </Route>
);
