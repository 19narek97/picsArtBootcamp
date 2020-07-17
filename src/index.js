import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Routers} from "./routers"
import {store} from "./store/store";
import {Provider} from 'react-redux'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css';
import FireBase ,{FireBaseContext} from './firebase'


import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <FireBaseContext.Provider value={new FireBase()}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </FireBaseContext.Provider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
