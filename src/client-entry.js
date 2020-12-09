import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import createApp from './createApp';
import cookie from 'react-cookies'
import './global.css'


const initState = window.__INITIAL_STATE__ || {};
if(cookie.load('jwtToken')){
    initState.userInfo = JSON.parse(window.localStorage.userInfo);
}
const { router, store } = createApp(initState);

window.onbeforeunload = (e) => {
    const state = store.getState();
    window.localStorage.userInfo = JSON.stringify(state.userInfo);
};

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            { router }
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
