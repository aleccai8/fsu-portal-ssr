import React from 'react'
import style from './Style.css';
import {Helmet} from "react-helmet";
import NavBar from "../../../../Component/Nav/Navbar";
import UserSettingNav from "../../../../Component/Nav/UserSettingNav";
import UserLoading from "../../../../Component/Loading/UserLoading";
import Footer from "../../../../Component/Nav/Footer";


function View(props) {
    const {loading,countryList,roles,cards,profile,sendingRequest,sendChangeProfileRequest} = props;
    let country = undefined;
    let role = undefined;
    let content = undefined;
    let sex = undefined;
    let card = undefined;
    if(loading){
        content = <UserLoading/>;
    }else{
        roles.forEach((value)=>{
            if(value.display){
                role =  value.detail.ident;
            }
        });
        cards.forEach((value)=>{
            if(value.inuse){
                card =  value.detail.ident;
            }
        });
        country = profile.country ? profile.country.id :"unset";
        sex = profile.sex;
        content =
            <div className="col-sm-12" style={{marginTop:"10px"}}>
                <div className={["col-sm-12",style.selectBox,style.formBox].join(' ')}>
                    <p style={{fontSize:"13px",marginTop:"10px",marginBottom: "0px"}}>
                        显示身份
                    </p>
                    <div className="form-group ">
                        <select className={["form-control", style.formBottom].join(' ')}
                                value={
                                    role
                                }
                                onChange={(event)=>{
                                    role = event.target.value;
                                }}
                        >
                            {
                                roles.map((item,index) => {
                                    return <option className={style.formBottom} value={item.detail.ident} key={item.detail.ident} >{item.detail.display_name}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className={["col-sm-12",style.selectBox,style.formBox].join(' ')}>
                    <p style={{fontSize:"13px",marginTop:"10px",marginBottom: "0px"}}>
                        国籍
                    </p>
                    <div className="form-group ">
                        <select className={["form-control", style.formBottom].join(' ')}
                                defaultValue={country}
                                onChange={(event)=>{
                                    country = event.target.value;
                                }}
                        >
                            <option className={style.formBottom} value={"unset"} key={"country_unset"}>未设置</option>
                            {
                                countryList.map((item,index) => {
                                    return <option className={style.formBottom} value={item.id} key={item.id} >{item.value}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className={["col-sm-12",style.selectBox,style.formBox].join(' ')}>
                    <p style={{fontSize:"13px",marginTop:"10px",marginBottom: "0px"}}>
                        性别
                    </p>
                    <div className="form-group ">
                        <select className={["form-control", style.formBottom].join(' ')} defaultValue={sex}
                                onChange={(event)=>{
                                    sex = event.target.value;
                                }}
                        >
                            <option value="0" className={style.formBottom}>未设置</option>
                            <option value="1" className={style.formBottom}>男</option>
                            <option value="2" className={style.formBottom}>女</option>
                        </select>
                    </div>
                </div>
                <div className={["col-sm-12",style.selectBox,style.formBox].join(' ')}>
                    <p style={{fontSize:"13px",marginTop:"10px",marginBottom: "0px"}}>
                        名片
                    </p>
                    <div className="form-group ">
                        <select className={["form-control", style.formBottom].join(' ')} defaultValue={card}
                                onChange={(event)=>{
                                    card = event.target.value;
                                }}
                        >
                            {
                                cards.map((item,index) => {
                                    return <option className={style.formBottom} value={item.detail.ident} key={item.detail.ident} >{item.detail.display_name}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
                <button
                    className="wuhupoo-botton-black"
                    style={{margin:"10px",marginLeft: "auto",
                            marginRight: "auto",
                            overflowY: "auto",
                            display: "block",width:"40%"}}
                    onClick={()=>{
                        sendChangeProfileRequest(role,country,sex,card)
                        console.log(role,country,sex,card)
                    }}
                >
                    {
                        sendingRequest?
                            <i className="fa fa-circle-o-notch fa-spin" style={{fontSize:"15px"}}/>:
                            null
                    }

                    保存信息
                </button>
            </div>
    }

    return (
        <div>
            <Helmet>
                <title>用户中心 - 资料设置</title>
                <body className={style.userBody}/>
            </Helmet>
            <NavBar {...props}/>
            <div className="container-fluid" style={{marginTop:20+"px"}}>
                <div className="row offset-md-1">
                    <UserSettingNav select="profile"/>
                    <div
                        className={[
                            "col-sm-8",
                            style.functionBox,
                        ].join(' ')}
                        style={{height:" 630px" ,backgroundColor: "rgb(61, 61, 61)",boxShadow: "10px 10px 4px #1b1b1b"}}
                    >
                        {content}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default React.memo(View);

