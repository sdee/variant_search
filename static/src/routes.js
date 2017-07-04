/* eslint new-cap: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import { Results } from './containers/results/Results';
import NotFound from './components/NotFound';
import ResultsTable from './components/Results/ResultsTable';
export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="home" component={HomeContainer} />
        <Route path="search" component={HomeContainer} />
        <Route path="gene/:geneName" component={ResultsTable} />
        <Route path="*" component={NotFound} />
    </Route>
);
