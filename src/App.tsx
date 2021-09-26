import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import IndexPageWithLayout from './pages/IndexPage';
import NewCampaignPageWithLayout from './pages/campaigns/NewCampaignPage';
import ViewCampaignPageWithLayout from './pages/campaigns/ViewCampaignPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header1">
          <Switch>
            <Route path="/" component={IndexPageWithLayout} exact />
            <Route
              path="/campaigns/new"
              component={NewCampaignPageWithLayout}
              exact
            />
            <Route
              path="/campaigns/:address"
              component={ViewCampaignPageWithLayout}
              exact
            />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
