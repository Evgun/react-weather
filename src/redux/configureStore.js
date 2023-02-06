import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import weather from './modules/weatherReducer';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware( loggerMiddleware, thunk)(createStore);

const reducer = combineReducers({
  weather
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
const store = configureStore();

export default store;