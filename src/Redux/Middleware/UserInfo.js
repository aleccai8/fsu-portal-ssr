import cookie from "react-cookies"
import {loadUserInfo, setUserAvatar} from "../Action/UserInfo";
import {LOAD_USER_INFO,SET_USER_AVATAR} from "../Constants/UserInfo";
import {getAvatarApi} from "../../Api/FSU";
import {setAxiosAuthorization} from "../../Api/Axios";

export const UserInfo = store=>next=> action => {
    const token = cookie.load('jwtToken');
    const isLogin = token !== undefined;
    const state = store.getState();

    if (isLogin !== state.userInfo.isLogin) {

        if (isLogin) {
            console.log(token);
            setAxiosAuthorization(token);
        }
        if (action.type !== LOAD_USER_INFO) {//判定action是否为USERINFO操作
            next(loadUserInfo(token));
        }
    }

/*    if (action.type !== SET_USER_AVATAR) {

        if (isLogin && state.userInfo.avatar === null) {
            console.log(1);
            getAvatarApi()
                .then((response) => {
                    console.log(response);
                    next(setUserAvatar(response.data.data.avatar));
                }).catch((e) => {
                console.log(e.message);
            })
        }
    }*/

    return next(action);
/*    console.log(action.type);
    const window = window || undefined;
    console.log(window);
    if (window && (action.type === LOAD_USER_INFO || action.type === SET_USER_AVATAR)) {
        console.log(22222);
        window.localStorage.userInfo = JSON.stringify(state.userInfo);
    }*/

};

