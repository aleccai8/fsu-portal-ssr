import React from 'react'
import style from './Style.css';
import { Link } from 'react-router-dom';


function HomeView(props) {
    const {select} = props;
    return (
        <div className={"col-sm-3 " + style.menuBox} style={{backgroundColor: "rgb(61, 61, 61)",boxShadow:" 10px 10px 4px #1b1b1b"}}>
            <div style={{textDecoration: "none"}}>
                <Link to={`/user/setting`}>
                    <div className={"text-center " + style.singleBox + ' ' + (select==='home'? style.singBoxClick:null)} ><i className="fa fa-user-circle-o"/>
                        首页
                    </div>
                </Link>
            </div>
            <div style={{textDecoration: "none"}}>
                <Link to={`/user/setting/callsign`}>
                    <div className={"text-center " + style.singleBox + ' ' + (select==='callsign'? style.singBoxClick:null)} ><i className="fa fa-vcard-o"/>
                        呼号管理
                    </div>
                </Link>
            </div>
            <div style={{textDecoration: "none"}} >
                <Link to={`/user/setting/profile`}>
                    <div className={"text-center " + style.singleBox+ ' ' + (select==='profile'? style.singBoxClick:null)} ><i className="fa fa-cogs"/>
                        信息设置
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default React.memo(HomeView);