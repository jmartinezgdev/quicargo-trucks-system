import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageNotFound } from './common';
import { CreateLocation, ListLocation } from './components/Location';
import { CreateTruck, ListTruck } from './components/Truck';
import { Header } from './layout';

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
        <Route path="*">
            <PageNotFound />
          </Route>
      </Switch>
    </>
  );
}
export default App
