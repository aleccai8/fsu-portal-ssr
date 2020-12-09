import React from "react";
import style from './Style.css';
import {Helmet} from "react-helmet";
import NavBar from "../../../../Component/Nav/Navbar";
import UserSettingNav from "../../../../Component/Nav/UserSettingNav";
import Footer from "../../../../Component/Nav/Footer";

function ManageView(props) {
    const {callsign,onlineTime,atcTime,level,changingPassword,message,sendChangePasswordRequest} = props;
    let displayLevel = "";
    switch (level) {
        case 0:
            displayLevel = "SUSPEND";
            break;
        case 1:
            displayLevel = "PILOT/OBS";
            break;
        case 2:
            displayLevel = "S1";
            break;
        case 3:
            displayLevel = "S2";
            break;
        case 4:
            displayLevel = "S3";
            break;
        case 5:
            displayLevel = "C1";
            break;
        case 6:
            displayLevel = "C2";
            break;
        case 7:
            displayLevel = "C3";
            break;
        case 8:
            displayLevel = "I1";
            break;
        case 9:
            displayLevel = "I2";
            break;
        case 10:
            displayLevel = "I3";
            break;
        case 11:
            displayLevel = "SUP";
            break;
        case 12:
            displayLevel = "ADM";
            break;
    }
    let password = undefined;
    return (
        <div>
            <Helmet>
                <title>用户中心 - 呼号管理</title>
                <body className={style.userBody}/>
                <meta name="description" content="Nested component" />
            </Helmet>
            <NavBar {...props}/>
            <div className="container-fluid" style={{marginTop:20+"px"}}>
                <div className="row offset-md-1">
                    <UserSettingNav select="callsign"/>
                    <div
                        className={[
                            "col-sm-8",
                            style.functionBox,
                        ].join(' ')}
                        style={{height:" 630px" ,backgroundColor: "rgb(61, 61, 61)",boxShadow: "10px 10px 4px #1b1b1b"}}
                    >
                        <div

                            className={["col-sm-12",style.functionBox,style.boxBackground,"text-center"].join(' ')}
                            style={{marginTop: "10px",marginLeft: "0px"}}
                        >
                            <h4 style={{marginTop:"10px"}}>
                                欢迎回来{callsign}
                            </h4>
                            <h5>
                                飞行等级{displayLevel}
                            </h5>
                        </div>
                        <div className="container-fluid">
                            <div
                                className="row"
                                style={{padding:"0px",margin: "0px",marginTop: "10px"}}
                            >
                                <div
                                    className={["col text-center",style.functionBox].join(' ')}
                                    style={{padding:"20px",fontSize:"20px"}}
                                >
                                    <i className="fa fa-clock-o"/>
                                    <br/>
                                    联飞时间: {(onlineTime/60).toFixed(2)}小时
                                    <br/>
                                    管制时间: {(atcTime/60).toFixed(2)}小时
                                </div>
                                <div
                                    className={["col", style.functionBox,"text-center"].join(' ')}
                                    style={{padding:"20px"}}
                                >
                                    <i className="fa fa fa-unlock-alt"/>
                                    联飞密码
                                    <br/><br/>
                                    <div style={{backgroundColor:"rgb(61, 61, 61)"}}>
                                        <input type="password"
                                               style={{backgroundColor:"rgb(61, 61, 61)",color:"rgb(214, 214, 214)", borderStyle:
                                                       "solid", borderWidth: "1px", marginLeft:"5px",fontSize:"16px"}}
                                               ref={(input)=>{
                                                   password = input;
                                               }}
                                        />
                                        <button
                                            className={style.buttonHead}
                                            style={{backgroundColor:"rgb(61, 61, 61)",color:"rgb(255, 255, 255)",borderStyle:
                                                    "solid", borderWidth: "1px", marginLeft:"5px",fontSize:"16px"}}
                                            onClick={()=>sendChangePasswordRequest(password.value)}
                                        >
                                            {
                                                changingPassword?
                                                    <div>
                                                        <i className="fa fa-circle-o-notch fa-spin"
                                                           style={{fontSize:"15px"}}/>
                                                        "更新中..."
                                                    </div> :
                                                    "更新密码"
                                            }
                                        </button>
                                        <br/><br/>
                                    </div>
                                    <span className={style.errorFont}>{message}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default React.memo(ManageView);