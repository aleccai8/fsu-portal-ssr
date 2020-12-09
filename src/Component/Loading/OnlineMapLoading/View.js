import React from 'react'
import style from './Style.css';
import {Helmet} from "react-helmet";
import full from "../images/full.png"


function View(props) {


    return (
        <div>
            <Helmet>
                <body className={style.mapLoadingbody}/>
            </Helmet>
            <div className="container-fluid">
                <div className={["row justify-content-center align-items-center text-center",style.mapLoadingLogoHeight].join(' ')}>
                    <div className="col-sm-10">
                        <div className="col-sm-12 row justify-content-center">
                            <div className={["col-sm-3",style.mapLoadingLogoAnimation].join(' ')}>
                                <img className={style.mapLoadingLogoimg} src={full}  alt=""/>
                            </div>
                            <div className={["col-sm-3",style.OnlineMAP].join(' ')}>
                                <h1 style={{color:"white",marginTop:"40px"}}>Online MAP</h1>
                            </div>
                        </div>
                        <div style={{color:"white",fontSize:"20px",marginTop:"40px"}}>正在初始化···</div>
                        <div className="text-center" style={{color: "rgb(87, 87, 87)"}}>FSU online Map 1.2.4 190718-RC</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(View);

