/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import Main from './src/Test/TestComponent';
import {name as appName} from './app.json';
import store from "./src/redux/store";

import {Provider} from "react-redux";

const App = ()=>{
    return(
        <Provider store={store}>
            <Main/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
