import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import NotFound from './components/NotFound';
import ResultsPage from './components/Results/ResultsPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="home" component={HomeContainer} />
        <Route path="search" component={HomeContainer} />
        <Route path="gene/:geneName" component={ResultsPage} />
        <Route path="*" component={NotFound} />
    </Route>
);
