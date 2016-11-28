import React from 'react'
import {App, requireAuth} from './components'
import * as Page from './pages'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
// import axios from 'axios'

// axios
//     .interceptors
//     .response
//     .use(undefined, function (err) {
//         return new Promise((resolve, reject) => {
//             console.log(err);
//             if (err.status === 401) {
//                 console.log('unauthorized redirect...');
//                 reject('redirect...');
//             }
//             throw err;
//         });
//     });

export const Routes = props => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Page.Home}/>
            <Route path="login" component={Page.Login}/>
            <Route path="signup" component={Page.Signup}/>
            <Route path="logout" component={Page.Logout}/>
            <Route path="site/:_id" component={requireAuth(Page.Site)}/>
            <Route path="users" component={requireAuth(Page.Users)}/>
            <Route path="categories" component={requireAuth(Page.Categories)}/>
            <Route path="inventory">
                <IndexRoute component={requireAuth(Page.Inventory)}/>
                <Route path="new" component={requireAuth(Page.EditItem)}/>
                <Route path="item/:_id" component={requireAuth(Page.EditItem)}/>
            </Route>
            <Route path="settings" component={requireAuth(Page.Settings)}/>
            <Route path="*" component={Page.NotFound}/>
        </Route>
    </Router>
);
