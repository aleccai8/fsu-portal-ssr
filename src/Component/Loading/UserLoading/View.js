import React from 'react'
import full from '../images/full.png'
import style from './Style.css';


function View() {
    return (
            <div className="container-fluid" style={{marginTop: "calc(50% - 190px)"}}>
                <div className={["row justify-content-center align-items-center text-center"].join(' ')}>
                    <div className="col-sm-12">
                        <img className={style.loadingLogoImg} src={full} alt={`logo`}/>
                        <div style={{color:"white",fontSize:"20px",marginTop:"20px"}}>加载中···</div>
                    </div>
                </div>
            </div>
    )
}

export default React.memo(View);