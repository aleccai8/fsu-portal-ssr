import React from 'react'
import style from './Style.css';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import NavBar from "../../Component/Nav/Navbar/Container";
import Footer from "../../Component/Nav/Footer";


function View(props) {
    const {
        username,
        avatar,
        isLogin,
        eventList,
        loadingMore,
        loadingFailed,
        loadingEnded,
        onClickMoreButton,
        onClickStatusButton,
        displayStatus,
        statistics,
    } = props;


    return (
        <div>
            <Helmet>
                <body className={style.body}/>
            </Helmet>
            <div>
                <NavBar/>
                <div className={["col-sm-12",style.activityTitleBox].join(' ')}>
                    模拟飞行联盟活动列表
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className={["col-sm-11 row m-auto",style.activityMainBox].join(' ')} style={{margin:"0 auto"}}>
                            <div className={["col-sm-9",style.activityListBox].join(' ')}>

                                {
                                    eventList?eventList.map((item,index)=>{
                                        return (
                                        <div className={["col-sm-12 row",style.activityExhibitionBox].join(' ')} key={"eventList_"+index}>
                                            <div className="col-sm-5" style={{padding:"0px"}}>
                                                <img className="img-fluid"
                                                     src={item.picture}
                                                     alt="" style={{maxHeight:"400px"}}/>
                                            </div>
                                            <div className="col-sm-7" style={{wordWrap:"break-word"}}>
                                                <h4 style={{marginTop:"10px"}}>【2020-04-05】深圳-洛杉矶 口罩支援</h4>
                                                <p>
                                                    {item.introduction}
                                                </p>
                                                <div className="col-sm-12" style={{marginBottom:"20px"}}>
                                                    <span className="badge badge-pill badge-warning">10人参与</span>&nbsp;
                                                    <span className="badge badge-pill badge-info">{item.time}</span>&nbsp;
                                                    <span className="badge badge-pill badge-success">{item.credit[0]} {item.reward} {item.credit[1]}</span>&nbsp;
                                                    {
                                                        (()=>{
                                                            switch (item.status) {
                                                                case "ENDED":
                                                                    return <span className="badge badge-success">已结束</span>;
                                                                case "IN_PROGRESS":
                                                                    return <span className="badge badge-danger">进行中</span>;
                                                                case "IN_THE_PLAN":
                                                                    return  <span className="badge badge-secondary">计划中</span>

                                                            }
                                                        })()
                                                    }

                                                </div>
                                            </div>
                                        </div>);
                                    }):null
                                }



                                <div className={["col-sm-12 row text-center",style.activityLoading].join(' ')}>
                                    {
                                        loadingEnded?
                                            <div className="text-center col-sm-12">
                                                没有更多了
                                            </div>:(loadingMore?
                                            <div className="text-center col-sm-12"> <i className="fa fa-circle-o-notch fa-spin"/>
                                                正在加载，请稍后···-
                                            </div>
                                            :
                                            <div className="text-center col-sm-12" onClick={onClickMoreButton}>
                                                加载更多
                                            </div>)
                                    }
                                    {
                                        loadingFailed?<div className="text-center col-sm-12">加载实败，请单击重试</div>:null

                                    }


                                </div>


                            </div>


                            <div className={["offset-md-8 col-sm-3",style.activeQueryDevice].join(' ')} style={{position:"fixed"}}>
                                {
                                    isLogin?
                                        <div className={["col-sm-12",style.activityUser].join(' ')}>
                                            <div className="row">
                                                <div className="col-sm-4 m-auto" style={{padding:"8px"}}>
                                                    <img className="img-fluid rounded-circle img-thumbnail"
                                                         src={avatar}
                                                         alt="avatar" style={{objectFit: "cover",marginTop:"10px"}}/>
                                                </div>
                                                <div className="col">
                                                    <div>
                                                        <h5 style={{marginTop:"10px"}}>{username}</h5>
                                                    </div>
                                                    <div>
                                                        Lv.1
                                                        <div className="progress" style={{borderRadius:"0px"}}>
                                                            <div className="progress-bar bg-info" style={{width: "50%"}}/>
                                                        </div>

                                                    </div>
                                                    <div className={style.activityad}>
                                                        管理面板
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                                {
                                    statistics?
                                        <div>
                                            <div className={["col-sm-12 text-center",style.activityStateBox,style.activityBackgroundColorBlue,displayStatus==="IN_THE_PLAN"?style.activitySelect:null].join(' ')}
                                                 onClick={()=>{
                                                     onClickStatusButton("IN_THE_PLAN");
                                                 }}
                                            >
                                                还未开始的活动 <span className="badge badge-pill badge-warning">{statistics.IN_THE_PLAN}</span>
                                            </div>
                                            <div className={["col-sm-12 text-center",style.activityStateBox,style.activityBackgroundColorOrange,displayStatus==="IN_PROGRESS"?style.activitySelect:null].join(' ')}
                                                 onClick={()=>{
                                                     onClickStatusButton("IN_PROGRESS")
                                                 }}
                                            >
                                                正在进行的活动 <span className="badge badge-pill badge-warning">{statistics.IN_PROGRESS}</span>
                                            </div>
                                            <div className={["col-sm-12 text-center",style.activityStateBox,style.activityBackgroundColorGreen,displayStatus==="ENDED"?style.activitySelect:null].join(' ')}
                                                 onClick={()=>{
                                                     onClickStatusButton("ENDED")
                                                 }}
                                            >
                                                已经结束的活动 <span className="badge badge-pill badge-warning">{statistics.ENDED}</span>
                                            </div>
                                        </div>:null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default React.memo(View);