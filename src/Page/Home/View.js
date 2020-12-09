import React from 'react'
import style from './Style.css';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import NavBar from "../../Component/Nav/Navbar/Container";
import Footer from "../../Component/Nav/Footer";


function HomeView(props) {
    return (
        <div>
            <Helmet>
                <title>模拟飞行联盟 - 门户 模拟飞行网 FSX_P3D_Xplane模拟飞行 - FSUnion</title>
                <meta name="keywords" content="FSX,P3D,PrePar3D,Xplane,模拟飞行,模拟飞行论坛,模拟飞行联盟,CHINAFSU"/>
                <meta name="description" content="模拟飞行联盟成立于2016年8月，是一家以模拟飞行为主的综合性论坛，拥有完善的连飞服务器，连飞语音服务器，相册，动态等功能，论坛目前注册人数1000余人。" />
            </Helmet>
            <div className={style.indexBackground}>
                <NavBar {...props}/>
                <div className={style.indexBox}>
                    <div className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
                        <div className={["col",style.indexMenu,style.indexMenuCentre,"text-center"].join(' ')} style={{padding:"20px"}}>
                            <div style={{marginBottom:" 5px"}}>欢迎来到中国模拟飞行联盟 FSU</div>
                            <div style={{fontSize:"17px"}}>查看更多 <i className={["fa fa-chevron-down",style.downKeyframess].join(' ')}
                                                                   style={{color:"aqua"}}/></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default React.memo(HomeView);