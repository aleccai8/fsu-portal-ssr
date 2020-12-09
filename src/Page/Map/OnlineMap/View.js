import React from 'react'
import style from './Style.css';
import {Helmet} from "react-helmet";
import NavBar from "../../../Component/Nav/Navbar/Container";
import OnlineMapLoading from "../../../Component/Loading/OnlineMapLoading";


function View(props) {
    const {
        selectedPilot,
        removePilotSelected,
        leafletLoaded,
        mapHeight,
        consoleZoomOut,
        zoomOutSwitch,
        pilotList,
        atcList,
        serverList,
        listViewSelect,
        listSwitch,
        setRadarLayerOpacity,
        loadMap
    } = props;


    let listView =  <div/>;



    switch (listViewSelect) {
        case "pilot":
            listView =
                    pilotList.length > 0?
                        pilotList.map((item, index) => {
                            let depArrInfo = "机组未填写完整信息";
                            if (item.plan_depairport !== "" && item.plan_destairport !== "") {
                                depArrInfo = `${item.plan_depairport} —— ${item.plan_destairport}`
                            }
                            return (
                                <div
                                    className={["row", style.userListBox].join(' ')}
                                    key={"pilot_list_" + item.callsign}
                                    onClick={item.clickEvent}
                                >
                                    <img
                                        width="70px"
                                        height="70px;"
                                        src={item.airlineLogoUrl}
                                        style={{backgroundSize: "100%"}}
                                        alt="logo"/>
                                    <div>
                                        <h5 style={{
                                            marginTop: "4px",
                                            marginLeft: "20px"
                                        }}>{item.callsign}</h5>
                                        <p
                                            style={{
                                                marginTop: "0px",
                                                marginLeft: "20px",
                                                fontSize: "12px",
                                                color: "rgb(207, 207, 207)"
                                            }}
                                        >{depArrInfo}</p>
                                    </div>
                                </div>
                            )
                        }): <div className="text-center" style={{color:" rgb(207, 207, 207)"}}>当前没有机组在线</div>
            break;
        case "atc":
            listView =
                atcList.length>0?
                    atcList.map((item,index)=>{
                        return(
                            <div className={["row", style.userListBox].join(' ')}
                                 key={"atc_list_"+index}
                            >
                                <div className="col-sm-12 text-center" style={{textShadow: "1px 1px #030303"}}>
                                    <div>{item.callsign}</div>
                                    <div>{item.frequency}</div>
                                </div>
                            </div>
                        )
                    }):<div className="text-center" style={{color:" rgb(207, 207, 207)"}}>当前没有管制在线</div>
            break;

        case "server":
            listView =
                serverList.length > 0?
                    serverList.map((item,index)=>{
                        return(
                            <div className={["row", style.userListBox].join(' ')}
                                 key={"server_list_"+index}
                            >

                                <div className="col-sm-12 text-center" style={{textShadow:" 1px 1px #030303"}} key={"server_list_" + index}>
                                    <div style={{marginTop:"10px",fontSize:"20px"}} className="text-center">{item.ident}</div>
                                    <div
                                        style={{marginTop:"5px",fontSize:"15px"}}
                                        className="text-center"
                                    >{item.location}</div>
                                    <div style={{marginBottom:"10px"}}>{item.hostname}</div>
                                </div>
                            </div>
                        )
                    }):<div className="text-center" style={{color:" rgb(207, 207, 207)"}}>服务器正在维护</div>

    }

    let flightInfo = null;

    if(selectedPilot){
        flightInfo =
            <div className={["col-sm-3",style.flightInfoWrapper].join(' ')} >
                <div className={style.flightInfoTitle}>
                    <div className={style.flightInfoTitleText}>
                        <span>{selectedPilot.origin.callsign}</span>
                    </div>
                    <div className={style.flightInfoOverlayClose} onClick={removePilotSelected}>
                        <i className={"fa fa-close"}/>
                    </div>
                </div>
                <div className={style.flightInfoScroll}>
                    <div className={style.flightInfoAirportD}>
                        <div className={style.flightInfoAirportText}>
                            {selectedPilot.origin.plan_depairport}
                        </div>
                    </div>
                    <div className={style.flightInfoStatusIcon}>
                        <svg viewBox="0 0 40 40">
                            <circle style={{fill:" #fff"}} cx="20" cy="20" r="19.8"/>
                            <path style={{fill: "#F8C024"}} d="M33.5,22.5c-1.9,0.1-6.7-0.1-6.7-0.1s-8.2,11.6-9.5,11.5c-1.2-0.1-2.6-0.4-2.6-0.4s6-11.4,4.5-11.3
                                            c-1.5,0.1-8.1-0.2-8.1-0.2S7.4,26.6,7,26.5c-0.4,0-2.2-0.2-2.2-0.2s2.1-5.2,2.1-6.4c0,0,0,0,0-0.1l0,0c0-1.2-2.1-6.4-2.1-6.4
                                            s1.7-0.2,2.2-0.2c0.4,0,4.2,4.5,4.2,4.5s6.6-0.3,8.1-0.2c1.5,0.1-4.5-11.3-4.5-11.3S16,6,17.3,5.9c1.3,0.1,9.6,11.7,9.6,11.7
                                            s4.8-0.1,6.7-0.1c1.9,0.1,3.1,2.5,3.1,2.5l0,0C36.6,20.2,35.4,22.5,33.5,22.5z"/>
                        </svg>
                    </div>
                    <div className={style.flightInfoAirportA}>
                        <div className={style.flightInfoAirportText}>
                            {selectedPilot.origin.plan_destairport}
                        </div>
                    </div>
                    <div className={[style.flightData,style.whiteDivider].join(' ')}>
                        <div className={style.flightInfoIconPanel}>
                            <svg className={style.aircraftDataIcon}>
                                <svg viewBox="0 0 40 40">
                                    <path d="M27.7,1.7C27.7,1.7,27.7,1.7,27.7,1.7C27.6,1.7,27.6,1.7,27.7,1.7c-2.4-1-5-1.6-7.7-1.6C9.1,0.1,0.1,9,0.1,20
                                                    c0,10.9,8.9,19.8,19.8,19.8c10.9,0,19.8-8.9,19.8-19.8C39.8,11.7,34.8,4.7,27.7,1.7z M33.6,31.5c0-0.1-0.1-0.1-0.1-0.2L31.2,29
                                                    c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l2.2,2.3c0.1,0.1,0.2,0.1,0.3,0.2c-1.3,1.3-2.8,2.3-4.5,3.1l-0.5-1.2
                                                    c-0.2-0.5-0.8-0.7-1.3-0.5c-0.5,0.2-0.7,0.8-0.5,1.3l0.5,1.1c-1.6,0.6-3.2,0.9-4.9,1v-3.1c0-0.6-0.4-1-1-1s-1,0.4-1,1v3.1
                                                    c-1.8-0.1-3.6-0.5-5.2-1.1l0.5-1c0.3-0.5,0.1-1.1-0.4-1.3c-0.5-0.3-1.1-0.1-1.3,0.4l-0.6,1.1c-1.5-0.8-2.8-1.7-4.1-2.8c0,0,0,0,0,0
                                                    l2.2-2.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-2.2,2.3c-1-1.2-1.8-2.5-2.5-3.9l0.9-0.4C5.4,27,5.6,26.5,5.4,26
                                                    c-0.2-0.5-0.8-0.7-1.3-0.5l-0.9,0.4c-0.6-1.7-0.9-3.4-1-5.3h3.3c0.6,0,1-0.4,1-1s-0.4-1-1-1H2.2c0.1-1.7,0.5-3.4,1.1-5L4.4,14
                                                    c0.1,0,0.2,0.1,0.4,0.1c0.4,0,0.8-0.2,0.9-0.6c0.2-0.5-0.1-1.1-0.6-1.3l-1-0.4C4.9,10.3,5.9,9,7,7.8l1.9,1.9C9,10,9.3,10.1,9.5,10.1
                                                    c0.2,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L8.4,6.4C9.5,5.5,10.7,4.7,12,4l0.4,1c0.2,0.4,0.5,0.6,0.9,0.6c0.1,0,0.3,0,0.4-0.1
                                                    c0.5-0.2,0.8-0.8,0.5-1.3l-0.4-1c1.6-0.6,3.4-1,5.2-1.1v2.6c0,0.6,0.4,1,1,1s1-0.4,1-1V2.2c1.7,0.1,3.3,0.4,4.8,1L25.5,4
                                                    c-0.2,0.5,0,1.1,0.5,1.3c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.7-0.2,0.9-0.6l0.4-0.9c1.3,0.6,2.6,1.4,3.7,2.4l-2,2.1
                                                    c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.4,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l2-2.1c1.2,1.2,2.2,2.6,3,4.2l-1,0.5c-0.5,0.3-0.7,0.9-0.4,1.4
                                                    c0.2,0.3,0.5,0.5,0.9,0.5c0.2,0,0.3,0,0.5-0.1l0.8-0.4c0.6,1.5,1,3.2,1.1,4.9h-3.1c-0.6,0-1,0.4-1,1s0.4,1,1,1h3.2
                                                    c-0.1,1.7-0.3,3.3-0.9,4.9l-1.2-0.5c-0.5-0.2-1.1,0-1.3,0.5c-0.2,0.5,0,1.1,0.5,1.3l1.3,0.6C35.5,28.9,34.6,30.3,33.6,31.5z"/>
                                    <path d="M24.7,8.7c-0.5-0.2-1.1,0-1.3,0.5l-3.6,8.5c-1.1,0.1-2,1-2,2.2c0,0.5,0.2,1,0.5,1.4L17.6,23
                                                    c-0.2,0.5,0,1.1,0.5,1.3c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.8-0.2,0.9-0.6l0.7-1.6c1.1-0.1,2.1-1,2.1-2.2c0-0.5-0.2-1-0.5-1.4l3.6-8.5
                                                    C25.5,9.5,25.2,9,24.7,8.7z"/>
                                    <line x1="13.8" y1="28" x2="25.9" y2="28"/>
                                </svg>
                            </svg>
                        </div>
                        <div className={style.flexWrapper}>
                            <div className={style.flightDataRow}>
                                <div>
                                    <span className={style.flightDataSpanTitle}>地速</span>
                                    <div><span className={style.flightDataSpanData} >{selectedPilot.origin.groundspeed}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={[style.flightData,style.whiteDivider].join(' ')}>
                        <div className={style.flightInfoIconPanel}>
                            <svg className={style.aircraftDataIcon}>
                                <svg viewBox="0 0 40 40">
                                    <path d="M7.43,16.92c-1.11,0-2-0.37-2.58-1.11c-0.03-0.03-0.05-0.07-0.07-0.11c-0.76-1.26-1.2-1.96-1.69-2.74
            c-0.61-0.96-1.3-2.05-2.74-4.46c-0.18-0.31-0.19-0.69-0.01-1C0.51,7.2,0.84,7,1.2,7l2.92-0.02c0.22,0,0.42,0.06,0.59,0.19
            C5.53,7.76,6.3,8.31,7.13,8.9l2.23,1.6l4.35-0.02L9.18,1.95c-0.2-0.39-0.2-0.81,0.01-1.16c0.37-0.61,1.11-0.62,1.35-0.62l1.26-0.01
            c0.62-0.01,1.23,0.04,1.9,0.64c2.22,1.97,4.5,3.96,6.6,5.8c1.44,1.26,2.81,2.45,4.02,3.52l8.65,0.28c3.7,0.2,4.83,0.37,6.48,2.97
            c0.1,0.16,0.16,0.34,0.16,0.53c0.02,2.99-3.22,3.01-4.45,3.02L7.75,16.91C7.64,16.92,7.54,16.92,7.43,16.92z M7.69,14.91
            l27.48,0.01c1.98-0.01,2.36-0.37,2.43-0.74c-0.98-1.5-1.36-1.6-4.71-1.78l-8.88-0.28c-0.11,0-0.23-0.03-0.33-0.07
            c-0.11-0.04-0.39-0.18-0.48-0.25c-1.26-1.11-2.69-2.36-4.21-3.69c-2.11-1.84-4.39-3.83-6.61-5.81c-0.13-0.12-0.16-0.14-0.57-0.14
            l-0.26,0l4.49,8.45c0.21,0.4,0.2,0.86-0.03,1.24c-0.23,0.39-0.64,0.62-1.09,0.62l-5.8,0.03c-0.26-0.01-0.52-0.08-0.74-0.24
            l-2.43-1.74C5.22,10,4.53,9.5,3.81,8.98L2.96,8.99c0.84,1.39,1.35,2.18,1.81,2.91c0.49,0.77,0.94,1.47,1.68,2.72
            C6.57,14.74,6.85,14.96,7.69,14.91z M9.12,10.51C9.12,10.51,9.12,10.51,9.12,10.51L9.12,10.51z"/>
                                    <path d="M19.83,27.93c-2.13,0-4.16-0.77-5.77-2.21c-0.36-0.32-0.69-0.67-0.99-1.04c-0.35-0.43-0.28-1.06,0.16-1.41
            c0.43-0.35,1.06-0.28,1.41,0.16c0.23,0.28,0.48,0.55,0.76,0.8c1.33,1.19,3.03,1.8,4.81,1.69c1.78-0.1,3.41-0.88,4.6-2.21
            c0.13-0.14,0.25-0.29,0.36-0.44c0.33-0.44,0.96-0.53,1.4-0.2c0.44,0.33,0.53,0.96,0.2,1.4c-0.15,0.19-0.3,0.39-0.47,0.57
            c-1.54,1.72-3.66,2.75-5.98,2.87C20.16,27.92,20,27.93,19.83,27.93z"/>
                                    <path d="M19.43,34c-3.76,0-7.34-1.36-10.16-3.89c-0.23-0.2-0.45-0.41-0.66-0.63c-0.39-0.39-0.39-1.02,0-1.41
            c0.39-0.39,1.03-0.39,1.41,0.01c0.18,0.19,0.38,0.37,0.57,0.54c2.64,2.36,6.04,3.55,9.59,3.36c3.54-0.2,6.79-1.76,9.15-4.4
            c0.14-0.15,0.27-0.31,0.39-0.46c0.35-0.43,0.98-0.49,1.41-0.14c0.43,0.35,0.49,0.98,0.14,1.41c-0.15,0.18-0.3,0.36-0.46,0.53
            c-2.72,3.04-6.46,4.84-10.53,5.06C20.01,34,19.72,34,19.43,34z"/>
                                    <path d="M19.18,39.83c-5.47,0-10.68-1.98-14.78-5.66c-0.24-0.22-0.48-0.44-0.71-0.66c-0.4-0.39-0.4-1.02-0.02-1.41
            c0.38-0.4,1.02-0.41,1.41-0.02c0.21,0.21,0.43,0.41,0.65,0.61c4.02,3.6,9.21,5.41,14.6,5.12c5.39-0.3,10.34-2.68,13.94-6.71
            c0.14-0.16,0.28-0.31,0.41-0.47c0.36-0.42,0.99-0.48,1.41-0.12s0.48,0.99,0.12,1.41c-0.15,0.17-0.3,0.35-0.45,0.52
            c-3.96,4.42-9.4,7.04-15.32,7.37C20.02,39.82,19.6,39.83,19.18,39.83z"/>
                                </svg>
                            </svg>
                        </div>
                        <div className={style.flexWrapper}>
                            <div className={style.flightDataRow}>
                                <div>
                                    <span className={style.flightDataSpanTitle}>应答机</span>
                                    <div><span className={style.flightDataSpanData} >{selectedPilot.origin.transponder}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={style.flightDataRow}>
                                <div>
                                    <span className={style.flightDataSpanTitle}>纬度</span>
                                    <div><span className={style.flightDataSpanData} >{selectedPilot.origin.lat.toFixed(5)}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className={style.flightDataSpanTitle}>经度</span>
                                    <div><span className={style.flightDataSpanData} >{selectedPilot.origin.lon.toFixed(5)}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={[style.flightData,style.whiteDivider].join(' ')}>
                        <div className={style.flightInfoIconPanel}>
                            <svg className={style.aircraftDataIcon}>
                                <svg viewBox="0 0 40 40">
                                    <path d="M38.37,11.73c-1.41-0.93-4.59-1.21-8.6-1.46c-1.33-0.09-2.98-0.19-3.45-0.33c0,0-0.01-0.01-0.02-0.01
        		c-0.24-0.17-0.98-0.71-1.99-1.45c-8.05-5.91-9.66-6.97-10.31-7.12c-0.54-0.08-1.89-0.21-2.65,0.51c-0.8,0.8-0.48,1.76-0.33,2.19
        		c0.1,0.24,0.29,0.5,2.38,3.17c0.75,0.95,1.77,2.25,2.35,3.03c-1.92,0.11-5.76,0.12-6.41,0.01c0,0-0.01,0-0.01,0
        		c-0.56-0.25-3.72-2.28-6.51-4.13C2.67,6.04,2.48,5.98,2.29,5.98h-1.1c-0.34,0-0.66,0.18-0.84,0.46C0.16,6.73,0.13,7.1,0.28,7.41
        		c4.5,9.54,4.56,9.57,4.9,9.78c0,0,0,0,0,0c0.33,0.2,8.56,0.25,16.48,0.25c7.41,0,14.55-0.04,14.69-0.05c0.05,0,0.1-0.01,0.14-0.02
        		c2.64-0.5,3.21-1.89,3.32-2.68C39.98,13.46,39.21,12.2,38.37,11.73z M36.21,15.39c-2.33,0.07-26.03,0.04-29.9-0.04
        		c-0.55-1.1-1.95-4.02-3.19-6.62c3.93,2.59,5.1,3.24,5.52,3.41c0.18,0.09,0.62,0.26,4.5,0.2c4.11-0.05,4.35-0.26,4.63-0.49
        		c0.05-0.04,0.1-0.09,0.14-0.14c0.42-0.52,0.27-1.07,0.19-1.4l-0.03-0.11c-0.08-0.33-0.2-0.52-3.09-4.21
        		c-0.8-1.02-1.77-2.26-2.08-2.69c0.19-0.02,0.46-0.02,0.7,0.01c1.04,0.53,6.97,4.88,9.54,6.77c0.93,0.68,1.63,1.2,1.94,1.42
        		c0.51,0.47,1.53,0.56,4.56,0.75c2.47,0.16,6.61,0.43,7.64,1.15c0.02,0.01,0.11,0.06,0.13,0.08c0.16,0.09,0.49,0.57,0.42,0.96
        		C37.76,14.85,37.16,15.2,36.21,15.39z"/>
                                    <path d="M23.65,25.89c0.2,0.19,0.45,0.29,0.7,0.29c0.26,0,0.51-0.1,0.71-0.3c0.39-0.39,0.39-1.03-0.01-1.41l-4.26-4.22
        		c-0.38-0.38-1-0.39-1.39-0.01l-4.42,4.22c-0.4,0.38-0.41,1.01-0.03,1.41c0.38,0.4,1.01,0.41,1.41,0.03l2.65-2.53V35.4l-2.63-2.61
        		c-0.39-0.39-1.03-0.39-1.41,0.01c-0.39,0.39-0.39,1.03,0.01,1.41l4.26,4.22c0.19,0.19,0.45,0.29,0.7,0.29
        		c0.25,0,0.5-0.09,0.69-0.28l4.42-4.22c0.4-0.38,0.41-1.01,0.03-1.41c-0.38-0.4-1.01-0.41-1.41-0.03l-2.65,2.53V23.28L23.65,25.89z"/>
                                </svg>
                            </svg>
                        </div>
                        <div className={style.flexWrapper}>
                            <div className={style.flightDataRow}>
                                <div>
                                    <span className={style.flightDataSpanTitle}>高度</span>
                                    <div><span className={style.flightDataSpanData} >{selectedPilot.origin.alt}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={[style.flightData,style.whiteDivider].join(' ')}>
                        <div className={style.flightInfoIconPanel}>
                            <svg className={style.aircraftDataIcon} viewBox="0 0 40 40">
                                <path d="M32.59,14.05c-0.19-0.26-0.49-0.41-0.81-0.41h-5.32l1.57-7.11c0.07-0.3-0.01-0.61-0.2-0.84
        	c-0.19-0.24-0.48-0.37-0.78-0.37H21v-3.1h2.38c0.55,0,1-0.45,1-1s-0.45-1-1-1h-6.76c-0.55,0-1,0.45-1,1s0.45,1,1,1H19v3.1h-6.05
        	c-0.3,0-0.59,0.14-0.78,0.37c-0.19,0.24-0.26,0.55-0.2,0.84l1.57,7.11H8.21c-0.32,0-0.62,0.15-0.81,0.41
        	c-0.19,0.26-0.24,0.59-0.14,0.9l2.68,8.33c0.13,0.41,0.52,0.69,0.95,0.69h1.58v14.76c0,0.55,0.45,1,1,1h13.06c0.55,0,1-0.45,1-1
        	V23.97h1.58c0.43,0,0.82-0.28,0.95-0.69l2.68-8.33C32.84,14.64,32.78,14.31,32.59,14.05z M14.19,7.32h11.62l-1.39,6.32h-8.84
        	L14.19,7.32z M16.95,21.97v-6.32h5.36v6.32H16.95z M11.62,21.97l-2.04-6.32h5.19h0.17v6.32h-1.48H11.62z M25.53,37.73H14.47V23.97
        	h11.06V37.73z M28.38,21.97h-4.07v-6.32h0.92h5.19L28.38,21.97z"/>
                            </svg>
                        </div>
                        <div className={style.flexWrapper}>
                            <div className={style.flightDataRow}>
                                <div>
                                    <span className={style.flightDataSpanTitle}>航路</span>
                                    <div><span className={style.flightDataSpanData} >{selectedPilot.origin.plan_route}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>;
    }



    return (
        <div>
            <Helmet>
                <title>模拟飞行联盟 - 联飞地图 模拟飞行网 FSX_P3D_Xplane模拟飞行 - FSUnion</title>
                <meta name="keywords" content="FSX,P3D,PrePar3D,Xplane,模拟飞行,模拟飞行论坛,模拟飞行联盟,CHINAFSU,联飞地图,航迹,模拟飞行,联线飞行,联飞活动"/>
                <meta name="description" content="国内领先的模拟飞行联飞地图,用以查看当前登录联飞服务器的用户信息,航迹" />
                <link rel="stylesheet" href="/static/lib/leaflet/leaflet.css"/>
            </Helmet>
            <NavBar/>
            {
                leafletLoaded?null:
                    <OnlineMapLoading/>
            }
            {flightInfo}

            <div
                id="onlineMap"
                className={style.onlineMap}
                style={{ height: mapHeight+"px", width: '100%' }}
                />
            {
                !consoleZoomOut?
                    <div className={["text-center col-sm-3 offset-md-9",style.Fold].join(' ')}
                         onClick={zoomOutSwitch}
                    >
                        <i className="fa fa-angle-down"/>
                    </div>
                    :
                    <div
                        className={["col-sm-3 offset-md-9 row", style.mainConsole].join(' ')}
                        style={{marginRight: '0px', padding: '0px', height: mapHeight + 'px'}}
                    >
                        <div className="col-sm-12">
                            <div className={["text-center", style.fold].join(' ')}
                            onClick={zoomOutSwitch}>
                                <i className="fa fa-angle-down" style={{transform: "rotate(180deg)"}}/>
                            </div>

                            <div className="col-sm-12 row" style={{margin: "8px", padding: "0px"}}>
                                <div
                                    className={["col text-center", style.dataBox].join(' ')}
                                    /*class="{dataBoxClick:view.aviator}"*/
                                    onClick={()=>listSwitch("pilot")}
                                >
                                    飞行员 {pilotList.length}
                                </div>
                                <div
                                    className={["col text-center", style.dataBox].join(' ')}
                                    onClick={()=>listSwitch("atc")}
                                >
                                    空管 {atcList.length}
                                </div>
                                <div
                                    className={["col text-center", style.dataBox].join(' ')}
                                    onClick={()=>listSwitch("server")}
                                >
                                    Server {serverList.length}
                                </div>
                            </div>
                            <div className="col-sm-12" style={{paddingRight: "0px"}}>
                                <div className="input-group mb-3" style={{marginLeft: "0px"}}>
                                    <div className="input-group-prepend">
                              <span className={["input-group-text", style.searchleft].join(' ')}>
                                <i className="fa fa-search"/>
                              </span>
                                    </div>
                                    <input type="text" className={["form-control", style.search].join(' ')}/>
                                </div>
                            </div>
                            <div className={["col-sm-12", style.listBox].join(' ')}
                                 style={{padding: "30px", paddingTop: "10px"}}>
                                {listView}
                            </div>
                            <div className={["text-center", style.brightness].join(' ')}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                              <span className={["input-group-text", style.searchleftLD].join(' ')} >
                                      <i className="fa fa-sun-o" onClick={loadMap}/>
                              </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        defaultValue="0.5"
                                        className={["form-control", style.search].join(' ')}
                                        onChange={(event)=>{
                                            setRadarLayerOpacity(event.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="text-center" style={{color: "rgb(87, 87, 87)"}}>FSU online Map 1.6.8 190812-RC</div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default React.memo(View);

