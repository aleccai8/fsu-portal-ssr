import React from "react";
import {Helmet} from "react-helmet";
import style from "./Style.css";
import NavBar from "../../../../Component/Nav/Navbar";
import UserSettingNav from "../../../../Component/Nav/UserSettingNav";
import UserLoading from "../../../../Component/Loading/UserLoading";
import Footer from "../../../../Component/Nav/Footer";

function LoadingView(props) {

    return (
        <div>
            <Helmet>
                <title>用户中心 - 加载中</title>
                <body className={style.userBody}/>
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
                        <UserLoading/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )

}

export default React.memo(LoadingView)