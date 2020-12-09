import routerConfig from './router';
import createStore from './Redux/store';
import React from 'react'
import cookie from 'react-cookies'
import {renderRoutes} from "./renderRoutes";

const authed =  ()=>{
    return cookie.load('jwtToken') !== undefined;
};

export default function(store = {},isSsr = false) {
    return {
        router: renderRoutes(routerConfig,authed,isSsr),
        store: createStore(store),
        routerConfig,
    }
}


