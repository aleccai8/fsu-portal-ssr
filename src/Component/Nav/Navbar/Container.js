import React, {PureComponent} from 'react';
import View from "./View"
import {getAvatarApi, logoutApi} from "../../../Api/FSU";
import {loadUserInfo,setUserAvatar} from "../../../Redux/Action/UserInfo";
import {connect} from "react-redux";
import cookie from "react-cookies";


const mapStateToProps = state =>{
    return {...state.userInfo}
};

const mapDispatchToProps = dispatch => {
    return{
        loadUserInfo:()=>dispatch(loadUserInfo(cookie.load('jwtToken'))),
        setUserAvatar:(avatar)=>dispatch(setUserAvatar(avatar))
    }
};

class NavBar extends PureComponent{

    state = {
        logout:false
    };

    constructor(props) {
        super(props);
        this.state.isLogin = false;
    }

    componentDidMount() {
        if(this.props.isLogin && this.props.avatar === null){
            getAvatarApi(this.props.uid)
                .then((response) => {
                    this.props.setUserAvatar(response.data.data.avatar);
                }).catch((e) => {
                console.log(e.message);
            })
        }
    }

    onLogoutButtonClick = async () => {
         this.setState({
             logout: true
         });
         try {
             const result = await logoutApi();
             if (result.data.code === 200) {
                 $("#navScript").append(result.data.data.script);
                 setTimeout(() => {
                     this.props.loadUserInfo();
                     this.props.history.push('/login')
                 }, 3000);
             }
         } catch (e) {
             this.setState({
                 logout: false
             });
             console.log(e);
         }

     };


    render() {
        return(
            <View
                onLogoutButtonClick = {this.onLogoutButtonClick}
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)