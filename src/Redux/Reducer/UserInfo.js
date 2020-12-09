import {LOAD_USER_INFO, SET_USER_AVATAR} from "../Constants/UserInfo";

const initialState={
    isLogin:false,
    uid:undefined,
    username:undefined,
    avatar:null,
};

export default (state = initialState,action)=>{
    const {type} = action;
    switch (type) {
        case LOAD_USER_INFO:{
            return Object.assign({},state,{isLogin:action.isLogin,uid:action.info.uid,username:action.info.username,avatar:null})
        }
        case SET_USER_AVATAR:{
            return Object.assign({},state,{avatar:action.avatar})

        }
    }
    return state;
}