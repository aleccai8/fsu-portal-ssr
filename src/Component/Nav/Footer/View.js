import React from "react"
import logo from "../images/logo.png"
import style from "./Style.css"

function FooterView(props) {
    return(
            <footer className={["container-fluid"].join(' ')}>
                <div className={["row",style.footerBackground].join(' ')}>
                    <div className="col-sm-4">
                        <img src={logo} className={["img-fluid container",style.footerLogoImg].join(' ')}
                             style={{marginBottom:"30px",marginTop:"30px"}}/>
                    </div>
                    <div className="col-sm-8">
                        <div className="row" style={{marginTop:"30px"}}>
                            <div className="col-sm-4">
                                <div style={{color:"white",fontSize:"18px",textShadow: "1px 1px #636363"}}
                                     className={style.phoneTop}>中国模拟飞行联盟
                                </div>
                                <div className={style.XOPTIONX}>关于我们</div>
                                <div className={style.XOPTIONX}>友情链接</div>
                            </div>
                            <div className="col-sm-4">
                                <div style={{color:"white",fontSize:"18px",textShadow: "1px 1px #636363"}}
                                     className="phoneTop">社交区域
                                </div>
                                <div className={style.XOPTIONX}>论坛</div>
                                <div className={style.XOPTIONX}>QQ讨论群</div>
                            </div>
                            <div className="col-sm-4">
                                <div style={{color:"white",fontSize:"18px",textShadow: "1px 1px #636363",paddingTop:"10px"}}
                                     className={style.phoneTop}>©
                                    2019 chinafsu.com
                                    All rights
                                    reserved. <br/>滇ICP备18004515-1号
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    )
}

export default React.memo(FooterView);