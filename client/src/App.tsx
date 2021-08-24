import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreateTruck, ListTruck } from './components/truck';
import { Header, Footer } from './layout';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-xl">
        <Switch>
          <Route exact path="/">
            <ListTruck />
          </Route>
          <Route path="/create">
            <CreateTruck />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}
export default App
