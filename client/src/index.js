//Data layer control - Redux
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers';

const store = createStore(reducers,{},applyMiddleware(reduxThunk)) //First Argument is all the reducers in the application, second argument is initial state, third argument is middleware to send response from server to all reducers

ReactDOM.render(
    //The Provider tag combines both React and Redux so that they can work together. The redux centralized store is created and the complete App
    //is encapsulated within the provider tag
    <Provider store={store}><App/></Provider>,
    document.querySelector('#root')
);
