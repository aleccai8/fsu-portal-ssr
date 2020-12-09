import React from "react";
import {Helmet} from "react-helmet";
import logo from "./Images/logo.png"
import {Link} from "react-router-dom";
import style from "./Style.css";
function LoginView(props){
    const { onLoginButtonClick,
            handleInputChange,
            isLogin,
            buttonActive,
            sysError,
            usernameError,
            passwordError,
            captchaError} = props;
    return (
        <div>
            <Helmet>
                <body className={style.loginBody}/>
                <link rel="stylesheet" href="/static/lib/floating_form_labels/_floating-form-labels.css"/>
            </Helmet>
            <div className={style.loginBackground+' '+"row"} style={{marginLeft:`0px`,marginRight:`0px`}}>
                <div className={'col-xl-3 offset-md-7' + ' ' + style.loginNav} >
                    <form className={style.loginNav} style={{marginTop:100 + 'px'}}>
                        <div className="col-sm-12">
                            <img src={logo} className={`img-fluid container ${style.loginImg}`}  style={{marginBottom:`20px`}}/>
                        </div>
                        <span className={style.errorFont}>{sysError}</span>
                        <div className="ffl-wrapper">
                            <label className="ffl-label" type="text">用户名 </label>
                            <textarea  type="text" name="username" onChange={handleInputChange} style={{'color': 'white'}}/>
                            <span className={style.userPassFont}>{usernameError}</span>
                        </div>

                        <div className='ffl-wrapper' >
                            <label className="ffl-label"  type="password">密码</label>
                            <input type="password" name="password" className='inputt' onChange={handleInputChange}  autoComplete="false" style={{'color':'white'}}/>
                            <span className={style.userPassFont}>{passwordError}</span>
                        </div>
                        <div className="form-check">
                            <label className={`${style.ItSUnbelievable} form-check-label`} >
                                <input type="checkbox" name="remember" onChange={handleInputChange}  className="form-check-input"/> 记住我
                            </label>
                            <div id="vaptchaContainer" style={{'width': '100% ','height': '36px','marginTop':'10px','color':'white'}}>
                                <div className={style["vaptcha-init-mai"]}>
                                    <div className={style["vaptcha-init-loading"]}>
                                        <a href="https://www.vaptcha.com" target="_blank">
                                            <img src="https://cdn.vaptcha.com/vaptcha-loading.gif" />
                                        </a>
                                        <span className={style["vaptcha-text"]}>Vaptcha启动中...</span>
                                    </div>
                                </div>
                            </div>
                            <span className={style.userPassFont}>{captchaError}</span>
                            <button id="button" type="button" onClick={onLoginButtonClick} disabled={!buttonActive} className={style.loginBotton}>
                                {isLogin && <i className={`fa fa-circle-o-notch fa-spin`} style={{fontSize:'15px'}}/>}
                                {isLogin? '登录中':'登录'}
                            </button>
                            <br/><br/><br/>
                            <div className="row">
                                <div className="text-left col-6" style={{paddingBottom:6 + 'px',paddingLeft: 0 + "%"}}><Link className={style.backHref}  to="/"><i className="fa fa-angle-left"/>返回主页</Link></div>
                                <div className="text-right col-6" style={{paddingBottom:6 + 'px',paddingLeft: 0 + "%"}}><a className={style.backHref} href="https://bbs.chinafsu.com/member.php?mod=register"> 注册新帐户 <i className="	fa fa-angle-right"/></a></div>
                                <div className="text-left col-6" style={{paddingBottom: 6 + 'px', paddingLeft: 0 + "%"}}/>
                                <div className="text-right col-6" style={{paddingBottom:6 + 'px',paddingLeft: 0 + "%"}}><a className={style.backHref} href="https://bbs.chinafsu.com/member.php?mod=logging&action=login&viewlostpw=1"> 找回密码 <i className="	fa fa-angle-right"/></a></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div id="script"/>
        </div>
    )
}

export default  React.memo(LoginView);