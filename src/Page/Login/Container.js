import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import View from "./View"
import {loginApi} from "../../Api/FSU";
import Script from 'react-load-script'
import {loadUserInfo} from "../../Redux/Action/UserInfo";
import cookie from "react-cookies";

function mapStateToProps(state) {
    return{}
}

const mapDispatchToProps = dispatch => {
    return{
        loadUserInfo:()=>dispatch(loadUserInfo(cookie.load('jwtToken'))),
    }
};


class Login extends PureComponent{

    constructor(props){
        super(props);
    }

    state = {
        sysError:'',
        usernameError:'',
        passwordError:'',
        captchaError:'',
        username:'',
        password:'',
        remember:false,
        buttonActive:false,
        isLogin:false,
        captcha:undefined,
    };

    handleCaptchaLoaded = async () =>{
        vaptcha({
            //配置参数
            vid:VID,
            type: 'click', // 展现类型 点击式
            container: '#vaptchaContainer', // 按钮容器，可为Element 或者 selector
            color:'#696969',
            offline_server:'/api/captcha/offline',
        }).then((vaptchaObj) =>{
            this.setState({
                captcha:vaptchaObj,
            });

            vaptchaObj.render();
            vaptchaObj.listen('pass',async ()=>{
                await this.onCaptchaSuccess();
            });
        });
    };

    handleFloatingFormLabelsLoaded = async ()=>{
        $(".ffl-wrapper").floatingFormLabels();
    };


    onLoginButtonClick = async ()=>{
        this.setState({
            buttonActive:false,
            isLogin:true,
            sysError:'',
            usernameError:'',
            passwordError:'',
            captchaError:'',
        });

        try{
            const result = await loginApi({
                username:this.state.username,
                password:this.state.password,
                remember:this.state.remember,
                token:this.state.captcha.getToken(),
            });
            this.setState({
                usernameError:result.data.data.username || '',
                passwordError:result.data.data.password || '',
                captchaError:result.data.data.token||'',
            });
            if(result.data.code === 200){
                $("#script").append(result.data.data.script);
                this.props.loadUserInfo();
                setTimeout(()=>{
                    const { from } = this.props.location.state || { from: { pathname: '/' } };
                    this.props.history.push(from.pathname)
                },3000);
                return;
            }


        }catch (e) {
            const response = e.response;
            if(!response){throw e}
            if(response.status === 422){
                this.setState({
                    usernameError:response.data.data.username || '',
                    passwordError:response.data.data.password || '',
                    captchaError:response.data.data.token||'',
                });
            }else{
                this.setState({
                    sysError:e.message,
                });
            }

        }
        this.setState({
            buttonActive:false,
            isLogin:false
        });
        this.state.captcha.reset();
    };

    onCaptchaSuccess = async ()=>{
        await this.setState({
            buttonActive: true,
        });
        if(this.state.username.length > 0 && this.state.password.length>0){
            return this.onLoginButtonClick();
        }
    };

    handleInputChange = async (event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };


    render() {
        return(
            <div>
                <Script url="https://v.vaptcha.com/v3.js" onLoad={this.handleCaptchaLoaded.bind(this)} />
                <Script url="/static/lib/floating_form_labels/floatingFormLabels.min.js" onLoad={this.handleFloatingFormLabelsLoaded.bind(this)}/>
                <View
                    {...this.state}
                    onLoginButtonClick={this.onLoginButtonClick}
                    handleInputChange={this.handleInputChange}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);