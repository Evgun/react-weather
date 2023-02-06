import React from 'react';
import Main from './components/weather/Main';
import Menu from './components/weather/Menu';
import Header from './components/weather/Header';
import Footer from './components/weather/Footer';

import { Provider } from 'react-redux';
import store from './redux/configureStore';

import { Switch, Route } from 'react-router-dom'

import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: lightBlue,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="wrapper">
            <Header />
            <Menu />
            <Switch>
              <Route exact path='/' component={Main}/>
              <Route exact path='/:cnt(5)-days' component={Main}/>
            </Switch>
            <Footer />
        </div> 
      </Provider>
    </ThemeProvider>
  );
}

export default App;
