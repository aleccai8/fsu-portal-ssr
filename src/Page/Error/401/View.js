import React from 'react'
import style from './Style.css';
import { Link } from 'react-router-dom';
import full from "./../images/full.png"
import {Helmet} from "react-helmet";


function View(props) {
    const {history,location} = props;

    return (
        <div>
            <Helmet>
                <body className={style.Errorbody}/>
            </Helmet>
            <div>
                <div className="container-fluid">
                    <div className={["row justify-content-center align-items-center text-center",style.ErrorHeight].join(' ')}>
                        <div>
                            <h1 style={{fontSize:"80px"}}>401</h1>
                            <p style={{fontSize:"20px"}}>啊哦,需要先登录哦</p>
                            <button className={["wuhupoo-botton-black",style.hand].join(' ')} type="button" onClick={()=>history.goBack()}>返回上一页</button>
                            <Link to={{pathname: '/login' , state : { from: location }}}>
                                <button
                                    className={["wuhupoo-botton-black",style.hand].join(' ')}
                                    type="button"
                                    style={{marginLeft:"20px"}}
                                >前往登录页面</button>
                            </Link>
                        </div>
                        <img className={style.Errorimg} src={full} />
                        <div
                            style={{fontSize:"85px",fontWeight:"bold",marginLeft:"10px",marginTop:"-165px",marginBottom:"0px"}}
                        >?</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default React.memo(View);