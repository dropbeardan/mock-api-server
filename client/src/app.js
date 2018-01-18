import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Routing.
import { IndexRoute, Route, Router } from 'react-router';
import { routerReducer } from 'react-router-redux';

// Store.
import store from './store';

// Browser History.
import history from './history';

// Layouts.
import { App, Err404, Home, Instance } from './Components/Layouts';

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
            </Route>
            <Route path='/instance' component={App}>
                <IndexRoute component={Instance} />
            </Route>
            <Route path='*' component={App}>
                <IndexRoute component={Err404} />
            </Route>
        </Router>
    </Provider >,
    app
);