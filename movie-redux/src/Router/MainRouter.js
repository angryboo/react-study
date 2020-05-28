import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../Components/Pages/About';
import PopularContainer from '../Containers/PopulaContaner';
import UpcomingContainer from '../Containers/UpcomingContainer';
import Search from '../Components/Pages/Search';

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={PopularContainer} />
    <Route path="/About" component={About} />
    <Route path="/Popular" component={PopularContainer} />
    <Route path="/Upcoming" component={UpcomingContainer} />
    <Route path="/Search" component={Search} />
    <Route
      render={({ location }) => (
        <div>
          <h2>이 페이지는 존재하지 않습니다:</h2>
          <p>{location.pathname}</p>
        </div>
      )}
    />
  </Switch>
);

export default MainRouter;
