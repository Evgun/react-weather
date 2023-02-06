import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Error from './components/weather/Error404';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/:cnt(5)-days" component={App} />
        <Route path="/404" component={Error} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
