import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import LocsDataReducer from "./Reducer/LocsData";
import UserInfoReducer from "./Reducer/UserInfo";
import Home from "./Reducer/Page/Home"
import {Sync,UserInfo} from "./Middleware";
import Event from "./Reducer/Page/Event";


const middleWares = [
    UserInfo,
    Sync,
];

const storeEnhancers = compose(
    applyMiddleware(...middleWares),
);

const Reducer = combineReducers({
    pageData:combineReducers({
        home:Home,
        event:Event,
    }),
    locsData:LocsDataReducer,
    userInfo:UserInfoReducer,
});


export default initValues => createStore(Reducer, initValues, storeEnhancers);