import React from 'react';

export default [
    {
        path: '/',
        component: require('./Page/Home').default,
        exact: true,
        requireSsr:true,
    },
    {
        path:'/404',
        component:require('./Page/Error/404').default,
    },
    {
        path:'/login',
        component:require('./Page/Login').default,
        requireGuest:true,
        requireSsr:true,
    },
    {
        path:'/onlinemap',
        component:require('./Page/Map/OnlineMap').default,
        exact:true,
        requireSsr:true,
    },
    {
        path:'/user/setting',
        component:require('./Page/User/Setting/Home').default,
        exact: true,
        requireAuth: true,
    },
    {
        path:'/user/setting/callsign',
        component:require('./Page/User/Setting/Callsign').default,
        requireAuth: true,
    },
    {
        path:'/user/setting/profile',
        component:require('./Page/User/Setting/Profile').default,
        requireAuth: true,
    },
    {
        path:'/event',
        component:require('./Page/Event').default,
        requireSsr:true,
    }


]
