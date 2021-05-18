import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import { MsalProvider } from "@azure/msal-react";

import { PageLayout } from "./components/PageLayout";
import { Subscription } from "./pages/Subscription";
import { Profile } from "./pages/Profile";
import { IotHub } from "./pages/IotHubs";
import { Database } from "./pages/Database";
import { Devices } from "./pages/Devices";
import { ResourceGroup } from "./pages/ResourceGroup"

import "./styles/App.css";

const Pages = () => {
  return (
    <Switch>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route exact path="/">
        <Subscription />
      </Route>
      <Route exact path="/resourcegroup/:resourcegroupid">
        <ResourceGroup />
      </Route>
      <Route path="/resourcegroup/:resourcegroupid/database/:database">
        <Database />
      </Route>
      <Route path="/resourcegroup/:resourcegroupid/iothub/:iothub">
        <IotHub />
      </Route>
    </Switch>
  );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
class App extends Component {
  render() {
    const instance = this.props.instance;
    return (
      <Router>
        <MsalProvider instance={instance}>
          <PageLayout>
            <Pages/>
          </PageLayout>
        </MsalProvider>
      </Router>
    );
  }
}
export default App;
