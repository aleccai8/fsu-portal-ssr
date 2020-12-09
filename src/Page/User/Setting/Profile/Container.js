import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import View from "./View"
import config from "./../../../../../build/config"
import {getUserCountryList, getUserSettingProfile, setUserSettingProfile} from "../../../../Api/FSU";


const mapStateToProps = state =>{
    return {...state.userInfo};
};

const mapDispatchToProps = dispatch => {
    return{

    }
};

class SettingProfile extends PureComponent{

    state  = {
        loading:true,
        countryList:[],
        cards:[],
        roles:[],
        profile:undefined,
        sendingRequest:false,
    };

    constructor(props){
        super(props);
    }

    componentDidMount(){
        Promise.all([
            getUserCountryList(),
            getUserSettingProfile(),
        ]).then((response)=>{
            this.setState({
                countryList:response[0].data.data,
                cards:response[1].data.data.cards,
                roles:response[1].data.data.roles,
                profile:response[1].data.data.profile,
                loading:false
            });
        }).catch((e)=>{
            console.log(e.message)
        })
    }

    sendChangeProfileRequest = async (role,country,sex,card)=>{
        this.setState({
            sendingRequest:true,
        });
        setUserSettingProfile(role,country,sex,card)
            .then((response)=>{
                if(response.data.code === 1){
                    this.setState({
                        loading:true,
                    });
                    getUserSettingProfile()
                        .then((response)=> {

                            this.setState({
                                cards: response.data.data.cards,
                                roles: response.data.data.roles,
                                profile: response.data.data.profile,
                                loading: false,
                                sendingRequest:false,
                            });
                        })
                        .catch((e)=>{
                            console.log(e.message)
                        })
                }
            })
            .catch((e)=>{
                console.log(e.message);
                this.setState({
                    sendingRequest:false,
                });
            })

    };



    render() {
        return (
            <View
                {...this.state}
                {...this.props}
                sendChangeProfileRequest = {this.sendChangeProfileRequest}
            />
        );
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingProfile);