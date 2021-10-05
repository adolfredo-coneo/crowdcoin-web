import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import IndexPageWithLayout from './pages/IndexPage';
import NewCampaignPageWithLayout from './pages/campaigns/NewCampaignPage';
import ViewCampaignPageWithLayout from './pages/campaigns/ViewCampaignPage';
import RequestsCampaignPage from './pages/campaigns/RequestsCampaignPage';
import NewRequestPage from './pages/campaigns/NewRequestPage';

function App() {
  return (
    <BrowserRouter>
      <div>
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
            <Route
              path="/campaigns/:address/requests"
              component={RequestsCampaignPage}
              exact
            />
            <Route
              path="/campaigns/:address/requests/new"
              component={NewRequestPage}
              exact
            />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
