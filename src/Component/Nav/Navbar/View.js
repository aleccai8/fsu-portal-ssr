import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from "../images/logo.png"
import style from "./Style.css"
function HomeView(props) {
    const {isLogin,logout,username,uid,avatar,onLogoutButtonClick} = props;
    return (
        <nav className={"navbar navbar-expand-md navbar-dark " + (props.history && props.history.location.pathname === "/"?null:style.bgNav)} style={{zIndex:4000}}>
            <Link to={`/`}><img src={logoImage} width="80" height="28" className="d-inline-block align-top"
                             alt="logo" /></Link>
            <button className="navbar-toggler m-2" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
                    style= {{borderRadius: 45 + "px" , backgroundColor:"rgb(51, 51, 51)"}}>
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse " id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={`/`} className="nav-link" style={{color:'white'}}>首页</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " style={{color:'white'}} href="https://bbs.chinafsu.com">社区</a>
                    </li>
                    <li className={"nav-item "+ ' ' + style.dropdownBox + ' ' + style.dropdown}>
                        <a className="nav-link" href="#" id="navbardrop" data-toggle="dropdown" style={{color:'white'}}>
                            联飞中心 <i className={"fa fa fa-angle-down " + style.o}/>
                        </a>
                        <div className={"dropdown-menu "+style.dropdownMenu + ' ' +style.dropdownCss}>
                            <Link to={"/onlinemap"}className={"dropdown-item " + style.dropdownItem + ' ' + style.navMenuBox} ><i className="fa fa-globe" style={{fontSize:20 + 'px'}}/> 联飞地图</Link>
                            <Link to={`/event`} className={"dropdown-item " + style.dropdownItem + ' ' + style.navMenuBox} style={{color:'white'}} href="#"><i className="fa fa-fighter-jet" style={{fontSize:20 + 'px'}}/> 联飞活动</Link>
                        </div>
                    </li>
                </ul>
            </div>
            { isLogin?
                <div className={" ml-auto " + style.dropdownWuhupoo + ' ' + style.navxl}
                     style={{backgroundColor:"rgb(39, 39, 39)",padding:3+"px",paddingRight:15+ "px",borderRadius:40+"px"}}>
                        <span className={style.navxl} style={{"color":"white",marginLeft: 0+"px"}}>
                            <img id="img1" src={avatar} className={"rounded-circle " + style.Size} alt="avatar" style={{marginLeft: 0+"px"}}/>
                            {username}
                            <i className={"fa fa fa-angle-down " + style.o}/>
                        </span>
                    <div className={style.dropdownContentWuhupoo}>
                        <p>欢迎回来 {username}</p>
                        <div className="pdata pull-left">
                            <Link to={`/user/setting`}>个人中心</Link>
                        </div>
                        <div className="pdata pull-right">
                            <button id="button" className={style.logout} onClick={onLogoutButtonClick}>
                                {
                                    logout?
                                    <i className="fa fa-circle-o-notch fa-spin" style={{fontSize:15+"px"}}/>:null
                                }
                                注销
                            </button>
                        </div>
                    </div>
                </div>
               :
                <Link to={`/login`}>
                    <button type="button" className={style.navBotton}>
                        由此登录 FSU
                    </button>
                </Link>

            }
        <div id="navScript"/>
    </nav>

)
}


export default React.memo(HomeView);
