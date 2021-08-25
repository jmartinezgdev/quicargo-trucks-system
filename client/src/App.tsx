import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreateLocation, ListLocation } from './components/location';
import { CreateTruck, ListTruck } from './components/truck';
import { Header, Footer } from './layout';

const App: React.FC = () => {
  return (
    <>
      <Header />
        <Switch>
          <Route exact path="/">
            <ListTruck />
          </Route>
          <Route path="/create-truck">
            <CreateTruck />
          </Route>
          <Route path="/create-location/:truckId">
            <CreateLocation />
          </Route>
          <Route path="/locations/:truckId">
            <ListLocation />
          </Route>
        </Switch>
      <Footer />
    </>
  );
}
export default App
