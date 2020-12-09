import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import ManageView from "./ManageView"
import RegisterView from "./RegisterView"
import LoadingView from "./LoadingView";
import {
    searchCallsignApi,
    getRecommendCallsignApi,
    registerCallsignApi,
    getUserCallsignApi,
    setUserCallsignPassword
} from "../../../../Api/FSU";


const mapStateToProps = state =>{
    return {...state.userInfo};
};

const mapDispatchToProps = dispatch => {
    return{

    }
};

class SettingCallsign extends PureComponent{

    state  = {
        displayPage : 'loading',
        register:{
            step : 0,
            loading:false,
            text:"",
            callsign:"",
            password:"",
            success:false,
            recommendCallsign:[],
            inputDisable:false,
            nextButtonDisable:true,
        },
        callsign:undefined,
        level:undefined,
        onlineTime:undefined,
        atcTime:undefined,
        changingPassword:false,
        message:"",
    };

    constructor(props){
        super(props);
    }

    async componentDidMount() {
        await this.getCallsignInfo()
    }

    setRegisterStep = (step)=>{
        this.setState({
            register:Object.assign({},this.state.register,{
                step:step,
                text:"",
                nextButtonDisable: true,
            })
        })
    };

    getRecommendCallsign = async () => {
        this.setState({
            register:Object.assign({},this.state.register,{
                loading:true
            })
        });
        try {
            const response = await getRecommendCallsignApi();
            this.setState({
                register:Object.assign({},this.state.register,{
                    recommendCallsign: response.data.data
                })
            });
        }catch (e) {
            console.log(e.message)
        }finally {
            this.setState({
                register:Object.assign({},this.state.register,{
                    loading:false
                })
            });
        }
    };

    handleCallsignRegisterInputChange = async (event) => {
        let value = event.target.value.replace(/[^\d]/g, '');
        if (value.length === 4) {
            this.setState({
                register: Object.assign({}, this.state.register, {
                    callsign: value,
                    disable: true
                })
            });
            try{
                const response = await searchCallsignApi(value);
                if(response.data.data.registered){
                    this.setState({
                        register: Object.assign({}, this.state.register, {
                            text:"呼号已被占用",
                            disable: false
                        })
                    });
                }else{
                    this.setState({
                        register: Object.assign({}, this.state.register, {
                            text:"当前呼号可以使用",
                            disable: false,
                            nextButtonDisable:false
                        })
                    });
                }
            }catch (e) {
                this.setState({
                    register: Object.assign({}, this.state.register, {
                        text:e.message,
                        disable: false
                    })
                });
            }

        } else {
            this.setState({
                register: Object.assign({}, this.state.register, {
                    callsign: value,
                    nextButtonDisable:true
                })
            })
        }

    };

    handlePasswordRegisterInputChange = async (event)=>{
        let value = event.target.value;
        this.setState({
            register: Object.assign({}, this.state.register, {
                password: value,
            })
        })
    };

    sendRegisterRequest = async () => {
        const regex = /[\W]/g;
        const password = this.state.register.password;
        if (password.length < 6 || password.length > 12 || regex.test(password)) {
            this.setState({
                register: Object.assign({}, this.state.register, {
                    text: "密码只能由字母和数字组成且长度介于6-12位"
                })
            })
        } else {
            this.setRegisterStep(4);
            let message = "";
            let success = false;
            try {
                const result = await registerCallsignApi(this.state.register.callsign, this.state.register.password);
                if (result.data.code === 1) {
                    success = true;
                } else {
                    message = result.data.msg;
                }
            } catch (e) {
                message = e.msg;
            }finally {
                this.setRegisterStep(5);
                this.setState({
                    register: Object.assign({}, this.state.register, {
                        success,
                        text: message
                    })
                });
            }

        }
    };

    sendChangePasswordRequest = async (password)=>{
        if(/[\W]/g.test(password) || password.length <6 || password.length >12){
            this.setState({
                message:"密码只能由字母和数字组成且长度介于6-12位"
            });
        }else{
            this.setState({
                changingPassword:true
            });
            setUserCallsignPassword(password)
                .then((response)=>{
                    if(response.data.code === 1){
                        this.setState({
                            message:"密码修改成功"
                        });
                    }
                })
                .catch((e)=>{
                    this.setState({
                        message:e.message
                    });
                })
                .finally(()=>{
                    this.setState({
                        changingPassword:false
                    });
                })


        }
    };

    getCallsignInfo = async ()=>{
        try{
            const response = await getUserCallsignApi();
            console.log(response);
            if(response.data.data.registered){
                this.setState({
                    displayPage:"manage",
                    callsign:response.data.data.callsign,
                    onlineTime:parseFloat(response.data.data.onlineTime),
                    atcTime:parseFloat(response.data.data.atcTime),
                    level:response.data.data.level,
                })
            }else{
                this.setState({
                    displayPage:"register"
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    };

    render() {
        switch (this.state.displayPage) {
            case 'loading':
                return <LoadingView/>;
            case 'register':
                return <RegisterView
                    {...this.state}
                    {...this.props}
                    setRegisterStep = {this.setRegisterStep}
                    getRecommendCallsign = {this.getRecommendCallsign}
                    handleCallsignRegisterInputChange = {this.handleCallsignRegisterInputChange}
                    handlePasswordRegisterInputChange = {this.handlePasswordRegisterInputChange}
                    sendRegisterRequest = {this.sendRegisterRequest}
                    getCallsignInfo = {this.getCallsignInfo}
                />;
            case 'manage':
                return (
                    <ManageView
                        {...this.state}
                        {...this.props}
                        sendChangePasswordRequest = {this.sendChangePasswordRequest}
                    />
                );
        }


    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingCallsign);