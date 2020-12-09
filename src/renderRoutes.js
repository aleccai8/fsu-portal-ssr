import React from "react";
import { Route, Redirect, Switch } from 'react-router-dom'
import Error401 from "./Page/Error/401";

const indexPath = '/';
const authPath = '/login';


export const renderRoutes = (routes, authed,isSsr, extraProps = {}, switchProps = {}) => routes ? (
    <Switch {...switchProps}>
        {routes.map((route, i) => (
            <Route
                key={route.key || i}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={(props) => {
                    if(isSsr && !route.requireSsr){
                        return;
                    }
                    if (route.requireGuest && authed()) {
                        return <Redirect to={{pathname: indexPath}}/>
                    }
                    if (!route.requireAuth || authed() || route.path === authPath) {
                        return <route.component {...props} {...extraProps} route={route}/>
                    }
                    return <Error401 {...props} {...extraProps}/>
                    //return <Redirect to={{pathname: authPath, state: {from: props.location}}}/>
                }}
            />
        ))}
    </Switch>
) : null;