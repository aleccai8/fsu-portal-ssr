import {LOAD_USER_INFO,SET_USER_AVATAR} from "../Constants/UserInfo";
import cookie from "react-cookies"
import jwtDecode from "jwt-decode"

export const loadUserInfo = (token)=>{
    let info = {};
    if(token)
    {
        try{
            info = jwtDecode(token);
        }catch (e) {
           cookie.remove('jwtToken');
        }


    }
    return{
        type:LOAD_USER_INFO,
        isLogin:token !== undefined,
        info:info,
    }
};


export const setUserAvatar = (avatar)=>{
    return{
        type:SET_USER_AVATAR,
        avatar:avatar,
    }
};
