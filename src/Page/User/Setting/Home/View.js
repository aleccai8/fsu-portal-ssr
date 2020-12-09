import React from 'react'
import style from './Style.css';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import NavBar from "../../../../Component/Nav/Navbar"
import UserSettingNav from "../../../../Component/Nav/UserSettingNav";
import Model from "../../../../Component/Model/Message";
import UserLoading from "../../../../Component/Loading/UserLoading";
import Footer from "../../../../Component/Nav/Footer";


function View(props) {
    const {avatar,cardUrl,fuel,role,avatarLoading,infoLoading,country,sex,callsign,signIn,modalMessage,onSignButtonClick} = props;
    return (
        <div>
            <Helmet>
                <title>用户中心</title>
                <body className={style.userBody}/>
                <meta name="description" content="Nested component" />
            </Helmet>
            <NavBar {...props}/>
            <div className="container-fluid" style={{marginTop:20+"px"}}>
                <div className="row offset-md-1">
                    <UserSettingNav select="home"/>
                    <div
                        className={"col-sm-8 "+ style.functionBox}
                        style={{height: 900 + "px", backgroundColor: "rgb(61, 61, 61)",boxShadow: "10px 10px 4px #1b1b1b",padding:0+"px"}}
                    >
                    {
                        avatarLoading || infoLoading?
                            <UserLoading/>:
                                <div
                                    className={"col-sm-12 " + style.boxBackgroundImg}
                                    style={{padding:0+"px",background:"url('"+cardUrl+"_large.jpg')"}}>
                                    <div className="content">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <img
                                                    className={"center-block " + style.touxiangImg}
                                                    src={avatar}
                                                />
                                                <p
                                                    style={{fontSize:23+"px",textShadow: "2px 2px #030303"}}
                                                    className="text-center"
                                                />
                                                <div className="container-fluid">
                                                    <div className="row justify-content-center">
                                                        <div className={"col-sm-7 "+style.functionBox}>
                                                            <div style={{fontSize:13+"px",marginTop:10+"px"}}>
                                                                燃油
                                                            </div>
                                                            <div
                                                                className={"col-sm-12 "+style.functionBox + ' ' + style.fromBox}
                                                                id="ModalData"
                                                            >
                                                                <i className="fa fa-fire"/>
                                                                &nbsp;{fuel}
                                                            </div>
                                                            <div style={{fontSize:13+"px",marginTop:10+"px"}}>
                                                                身份
                                                            </div>
                                                            <div className={"col-sm-12 "+style.functionBox + ' ' + style.fromBox}>
                                                                <i className="fa fa-comments-o"/>
                                                                &nbsp;{role}
                                                            </div>
                                                            <div style={{fontSize:13+"px",marginTop:10+"px"}}>
                                                                国家
                                                            </div>
                                                            <div className={"col-sm-12 "+style.functionBox + ' ' + style.fromBox}>
                                                                <i className="fa fa-globe"/>
                                                                &nbsp;{country}
                                                            </div>
                                                            <div style={{fontSize:13+"px",marginTop:10+"px"}}>
                                                                性别
                                                            </div>
                                                            <div className={"col-sm-12 "+style.functionBox + ' ' + style.fromBox}>
                                                                <i className="fa fa-transgender-alt"/>
                                                                &nbsp;
                                                                {
                                                                    (()=>{
                                                                        switch (sex) {
                                                                            case '1':
                                                                                return '男';
                                                                            case '2':
                                                                                return '女';
                                                                            default:
                                                                                return '未设置';
                                                                        }
                                                                    })()
                                                                }
                                                            </div>
                                                            <div style={{fontSize:13+"px",marginTop:10+"px"}}>
                                                                呼号
                                                            </div>
                                                            <div className={"col-sm-12 "+style.functionBox + ' ' + style.fromBox}>
                                                                <i className="fa fa-vcard-o"/>
                                                                &nbsp;{callsign}
                                                            </div>
                                                            <div style={{fontSize:13+"px",marginTop:10+"px"}}>
                                                                正在使用的名片
                                                            </div>
                                                            <div
                                                                className={"col-sm-12 "+style.functionBox + ' ' + style.fromBox}
                                                                style={{padding:0+"px",background:"url('"+cardUrl+"_middle.jpg')"}}
                                                            >
                                                                <br/>
                                                                <br/>
                                                                <br/>
                                                                <br/>
                                                            </div>
                                                        </div>
                                                        {
                                                            (()=>{
                                                                switch(signIn){
                                                                    case 0:{
                                                                        return(
                                                                            <div className={"col-sm-4 " + style.functionBox}>
                                                                                <div
                                                                                    className={"col-sm-12 "+style.sign}
                                                                                    onClick={onSignButtonClick}
                                                                                >
                                                                                    <i className="fa fa-bell-o"/>
                                                                                    今日还未签到呢
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    case 1:{
                                                                        return (
                                                                            <div className={"col-sm-4 " + style.functionBox}>
                                                                                <div className={"col-sm-12 "+style.signn} >
                                                                                    <i className="fa fa-bell-o"/>
                                                                                    签到中
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    case  2:{
                                                                        return (
                                                                            <div className={"col-sm-4 " + style.functionBox}>
                                                                                <div className={"col-sm-12 "+style.signn} >
                                                                                    <i className="fa fa-bell-o"/>
                                                                                    今日已签到
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }

                                                            })()
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    }
                        <Model id="model" content={modalMessage}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default React.memo(View);

{/*
<div className="modal fade" id="myModal">
    <div className="modal-dialog">
        <div
            className="modal-content functionBox"
            style="background-color:rgb(49, 49, 49);color:white;   border-radius: 0px;margin-top:300px;"
        >
            <p
                style="font-size:16px;padding:10px;"
                className="text-center"
                v-html="modelData"
            />
            <div className="text-center">
                <button
                    type="button"
                    className="wuhupoo-botton-black"
                    data-dismiss="modal"
                    style="width:30%;margin:10px;"
                >
                    确定
                </button>
            </div>
        </div>
    </div>
</div>*/}
