import React from "react";
import {Helmet} from "react-helmet";
import style from "./Style.css";
import NavBar from "../../../../Component/Nav/Navbar";
import UserSettingNav from "../../../../Component/Nav/UserSettingNav";
import UserLoading from "../../../../Component/Loading/UserLoading";
import Footer from "../../../../Component/Nav/Footer";

function RegisterView(props) {
    const {register,setRegisterStep,getRecommendCallsign,handleCallsignRegisterInputChange,handlePasswordRegisterInputChange,sendRegisterRequest,getCallsignInfo} = props;
    let css;
    let page = "";
    switch (register.step) {
        case 0:
            page = (
                <div className="text-center" style={{padding:"15px"}}>
                    <h4>您还未拥有属于自己的呼号！</h4>
                    <p className="text-left">
                        想要和线上好友一起飞行,您必须注册一个呼号
                    </p>
                    <p className="text-left">
                        注册过程将会非常简单,无需花费过多的时间。
                    </p>
                    <button
                        type="button"
                        className="wuhupoo-botton-black"
                        onClick={()=>{
                            setRegisterStep(1)
                        }}
                    >
                        立刻进行注册
                    </button>
                </div>
            );
            break;
        case 1:
            css = style.registerClauseBoxBackground;
            page = (
                <div className="text-center">
                    <h4 className="text-center" style={{marginTop:" 20px"}}>
                        服务条款
                    </h4>
                    <div
                        className="col-sm-8 "
                        style={{overflowY:"auto",height:"400px",display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",marginBottom: "10px",backgroundColor:"rgb(41, 41, 41)",opacity: "0.7",padding:"10px"}}
                    >
                        假装我是呼号注册的使用条款
                    </div>
                    <button
                        type="button"
                        className="wuhupoo-botton-black"
                        style={{opacity: 0.9}}
                        onClick={async () => {
                            await getRecommendCallsign();
                            setRegisterStep(2);
                        }}
                    >
                        {
                            register.loading?
                                <i className="fa fa-circle-o-notch fa-spin"/>
                                :null
                        }
                        我同意
                    </button>
                </div>
            );
            break;
        case 2:
            let recommendCallsignString = "";
            register.recommendCallsign.forEach((value => {
                recommendCallsignString += "  "+value
            }));
            css = style.registerSelectBoxBackground;
            page = (
                <div className="text-center">
                    <h4 className="text-center" style={{marginTop: "20px"}}>
                        输入一个您喜欢的呼号
                    </h4>
                    <p className="text-center" style={{marginTop: "40px"}}>
                        推荐呼号：{recommendCallsignString}
                    </p>
                    <input
                        name="callsign"
                        type="text"
                        className={style.callInput}
                        style={{opacity: 0.8}}
                        value={register.callsign}
                        onChange={handleCallsignRegisterInputChange}
                        disabled={register.disable}
                    />

                    {
                        register.loading?
                        <i className="fa fa-circle-o-notch fa-spin"/>
                            :null
                    }

                    <p style={{color:"rgb(255, 162, 23)",fontSize:"13px",marginTop:"5px"}}
                    >{register.text}</p>
                    <button
                        type="button"
                        className="wuhupoo-botton-black"
                        style={{marginTop: "250px",marginBottom: "30px",opacity: 0.8}}
                        onClick={()=>{
                            setRegisterStep(3)
                        }}
                        disabled={register.nextButtonDisable}
                    >
                        下一步
                    </button>
                </div>
            );
            break;
        case 3:
            css = style.registerSelectBoxBackground;
            page = (
                <div className="text-center">
                    <h4 className="text-center" style={{marginTop: "20px"}}>
                        设置一个您的呼号密码
                    </h4>
                    <p className="text-center" style={{marginTop: "40px"}}>6~12位(仅数字,大小写字母)</p>
                    <input
                        name="password"
                        type="password"
                        className={style.callInput}
                        style={{opacity: 0.8,width:"40%"}}
                        value={register.password}
                        onChange={handlePasswordRegisterInputChange}
                    />
                    <p
                        style={{color:"rgb(255, 162, 23)",fontSize:"13px",marginTop:"5px"}}
                    >{register.text}</p>
                    <button
                        type="button"
                        className="wuhupoo-botton-black"
                        style={{marginTop: "250px",marginBottom: "30px",opacity: 0.8}}
                        onClick={()=>{
                            sendRegisterRequest()
                        }}
                    >
                        下一步
                    </button>
                </div>
            );
            break;
        case 4:
            css = style.registerSelectBoxBackground;
            page = (
                <div className="text-center">
                    <div style={{color:"white",fontSize:"25px",marginTop:"80px"}}>
                        <i className="	fa fa-circle-o-notch fa-spin"/> 注册中···
                    </div>
                </div>
            );
            break;
        case 5:
            css = style.registerSuccessBoxBackground;
            page = (
                <div className="text-center" key="Result">
                    {
                        register.success?
                            <div>
                                <h4 className="text-center"
                                    style={{marginTop: "80px",mmarginBottom:"40px",textShadow:" 2px 2px 2px 	#000000"}}>呼号注册完成</h4>
                                <p style={{textShadow: "1px 1px 1px 	#000000"}}>现在您可以使用本呼号登陆联飞服务器与好友一起线上飞行</p><br/>
                                <button type="button" className="wuhupoo-botton-black"
                                        style={{opacity: "0.9",marginRight:"20px"}}
                                        onClick={()=>{
                                            getCallsignInfo()
                                        }}
                                >前往管理呼号
                                </button>
                                <a href="https://bbs.chinafsu.com/forum.php?mod=viewthread&tid=406&highlight=%E8%BF%9E%E9%A3%9E%E8%B5%84%E6%96%99">
                                    <button type="button" className="wuhupoo-botton-black" style={{opacity: 0.9}}>查看联飞教程</button>
                                </a>
                            </div> :
                            <div>
                                <h4 className="text-center"
                                style={{marginTop: "80px",marginBottom:"40px",textShadow: "2px 2px 2px 	#000000"}}>注册失败<br/>原因:{register.text}
                                </h4>
                            </div>
                    }
                </div>
            )
    }

    return (
        <div>
            <Helmet>
                <title>用户中心 - 呼号注册</title>
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
                            css
                        ].join(' ')}
                        style={{height:" 630px" ,backgroundColor: "rgb(61, 61, 61)",boxShadow: "10px 10px 4px #1b1b1b"}}
                    >
                        {page}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )

}

export default React.memo(RegisterView);
