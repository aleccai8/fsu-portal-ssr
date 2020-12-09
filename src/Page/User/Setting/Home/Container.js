import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import View from "./View"
import {getAvatarApi, getUserSettingHomeApi, userSignInApi} from "../../../../Api/FSU";



const mapStateToProps = state =>{
    return {...state.userInfo};
};

const mapDispatchToProps = dispatch => {
    return{

    }
};

class SettingHome extends PureComponent{

    state  = {
        avatarLoading:true,
        infoLoading:true,
        avatar:undefined,
        fuel:undefined,
        role:undefined,
        country:undefined,
        sex:undefined,
        callsign:undefined,
        cardUrl:undefined,
        signIn: 0,
        modelMessage:''
    };

    constructor(props){
        super(props);
    }

    componentDidMount(){
        getAvatarApi(this.props.uid,'large').then((response)=>{
            this.setState({
                avatar:response.data.data.avatar,
                avatarLoading:false,
            });
        }).catch((e)=>{
            console.log(e.message);
        });

        getUserSettingHomeApi().then((response)=>{
            this.setState({
                fuel:response.data.data.fuel,
                role:response.data.data.role,
                country:response.data.data.profile.country,
                sex:response.data.data.profile.sex,
                callsign:response.data.data.callsign,
                cardUrl:OSS_BUCKET_URL + response.data.data.cardUrl,
                signIn:response.data.data.signIn?2:0,
                infoLoading:false,
            })
        }).catch((e)=>{
            console.log(e.message);
        });
    }

    onSignButtonClick = ()=>{
        this.setState({
            signIn:1
        });
        userSignInApi().then((response)=>{
            if(response.data.code === 1){
                this.setState({
                    signIn:2,
                    fuel:response.data.data.fuel,
                    modalMessage:'签到成功！'
                });
            }else{
                this.setState({
                    signIn:2,
                    modalMessage:'当日已签到！'
                });
            }
            $("#model").modal();
        }).catch((error)=>{
            console.log(error.message);
            this.setState({
                signIn:0,
                modalMessage:'签到失败，请刷新后重试！'
            });
            $("#model").modal();
        });

    };


    componentWillUnmount() {

    }

    render() {
        return (
            <View
                onSignButtonClick = {this.onSignButtonClick}
                {...this.state}
                {...this.props}
            />
        );
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingHome);