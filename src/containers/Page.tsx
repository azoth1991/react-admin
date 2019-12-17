import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from 'lib/store/store'
import NotFound from 'pages/pages/NotFound'
import Login from 'pages/pages/Login'
import App from './App'

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
          <Route path="/app" component={App} />
          <Route path="/404" component={NotFound} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ConnectedRouter>
  </Provider>
)
