import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import Script from "react-load-script"
import View from "./View"
import {getWhazzupJsonApi, getWhazzupPilotTrackApi} from "../../../Api/FSU";
import planeIcon from "./images/plane.png"
import atcIcon from "./images/atc.png"
import jsonh from "./../../../Utils/jsonh"
const mapStateToProps = state =>{
    return {...state.userInfo}
};

const mapDispatchToProps = dispatch => {
    return{
    }
};

class OnlineMap extends PureComponent{

    state  = {
        mapHeight:undefined,
        leafletLoaded:false,
        consoleZoomOut: false,
        pilotList:[],
        atcList:[],
        serverList:[],
        listViewSelect:"pilot",
        selectedPilot:undefined,
    };

    refreshInterval = 30  * 1000;
    pluginLoadCount = 0;
    updateTime = undefined;
    pilots = [];
    atcs = [];
    liveflag = true;
    pluginList =  [
        "/static/lib/leaflet/plugin/MovingMarker.js",
        "/static/lib/leaflet/plugin/leaflet.rotatedMarker.js",
        "/static/lib/leaflet/plugin/leaflet-ant-path.es6.js",
    ];

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.resizeListener =  this.handleResize.bind(this);
        window.addEventListener('resize', this.resizeListener);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener);
        clearInterval(this.whazzupInterval);
    }

    handleResize = (e)=>{
        this.setState({
            mapHeight:this.getMapHeight(e.target.innerHeight)
        });
    };

    getMapHeight(windowHeight){
        if(this.props.isLogin){
            return windowHeight- 60;
        }else{
            return windowHeight- 53;
        }
    }

    handleLeafletOnLoad(){
        this.icons = {
            'plane':L.icon({
                iconUrl: planeIcon,
                iconSize: [20, 20]
            }),
            'atc':L.icon({
                iconUrl: atcIcon,
                iconSize: [20, 20]
            })
        };
        this.setState({
            mapHeight:this.getMapHeight(document.documentElement.clientHeight)
        });
        this.map = L.map("onlineMap", {
            center: [34.505, 108.09],
            zoom: 5,
            minZoom: 3,
            maxZoom: 18,
        });
        this.map.on('move',this.mapMoveHandle);
        this.map._onResize();
        this.loadMap();
        this.updateWeather();
        setInterval(this.updateWeather,30*60*1000);
        this.setState({
            leafletLoaded:true,
        })
    }

    loadMap(){
        if(this.mapLayer){
            this.map.removeLayer(this.mapLayer);
        }
        if(this.mapFlag){
            this.mapLayer = L.tileLayer(
                "http://mt2.google.cn/vt/lyrs=s@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
                {}
            ).addTo(this.map);
            this.mapFlag = false;

        }else{
            this.mapLayer = L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
                {
                    reuseTiles: true,
                },
                {
                    attributions:
                        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                }
            ).addTo(this.map); //这里加载openstreetmap
            this.mapFlag = true;
        }

    }

    updateWeather(){
        let apiRequest = new XMLHttpRequest();
        apiRequest.open(
            "GET",
            "https://tilecache.rainviewer.com/api/maps.json",
            true
        );

        apiRequest.onload =  e => {
            const timestamps = JSON.parse(apiRequest.response);

            if (this.radarLayer) this.map.removeLayer(this.radarLayer);
            let ts = timestamps[timestamps.length - 2];

            this.radarLayer = new L.TileLayer(
                "https://tilecache.rainviewer.com/v2/radar/" +
                ts +
                "/256/{z}/{x}/{y}/4/1_1.png",
                {
                    tileSize: 256,
                    opacity: 1,
                    zIndex: ts,
                    maxZoom: 9,
                }
            );
            this.map.addLayer(this.radarLayer.setOpacity(0.5));
        };
        apiRequest.send();
    }

    setRadarLayerOpacity(opacity){
        this.radarLayer.setOpacity(opacity);
    }

    handleLeafletPluginLoad(){
        this.pluginLoadCount++;
        this.updateWhazzup().then();
    }

    async updateWhazzup() {
        if(this.pluginLoadCount  === this.pluginList.length){
            if(!this.whazzupInterval){
                this.whazzupInterval  = setInterval(this.updateWhazzup.bind(this),this.refreshInterval);
            }
            try{
                const response = await getWhazzupJsonApi(this.updateTime);
                const data = response.data.data;
                const clients = jsonh.parse(data.client);
                const servers = jsonh.parse(data.server);
                this.updateTime = data.updateTime;
                this.liveflag = !this.liveflag;
                const pilotList = [];
                const atcList = [];
                clients.forEach((value)=>{
                    let pilot = {};
                    if(value.type === "PILOT"){
                        if(this.pilots[value.callsign]){
                            pilot = this.pilots[value.callsign];
                            pilot.tracks = pilot.tracks.concat(jsonh.parse(value.tracks));
                            pilot.liveflag = this.liveflag;
                            pilot.origin = value;
                            if(!pilot.moveTimeout){
                                this.moveAirplane(pilot);
                            }
                            if(this.state.selectedPilot === pilot){
                                this.setState({
                                    selectedPilot:pilot,
                                })
                            }
                        }else{
                            let startIndex = 0;
                            console.log(value.callsign,value.tracks);
                            const tracks =  jsonh.parse(value.tracks);
                            pilot = {
                                tracks:tracks,
                                animationIndex:startIndex,
                                marker:L.Marker.movingMarker([[tracks[startIndex].lat, tracks[startIndex].lon]],this.refreshInterval,{
                                    icon:this.icons["plane"],
                                    rotationOrigin: "center center",
                                }),
                                moveTimeout:undefined,
                                liveflag:this.liveflag,
                                origin:value,
                                trackStartIndex:value.trackStartIndex,
                                trackLoaded:false,
                            };
                            pilot.marker.on("click",()=>{
                                this.pilotSelectedHandle(pilot);
                            });
                            pilot.marker.setRotationAngle(this.getHeading(tracks[startIndex].pbh));
                            pilot.marker.addTo(this.map);
                            this.pilots[value.callsign] = pilot;
                            this.moveAirplane(pilot);

                        }
                        pilotList.push({
                            ...value,
                            clickEvent:()=>this.pilotSelectedHandle(pilot)
                        });
                    }else if(value.type === "ATC"){
                        atcList.push(value)
                    }

                });
                for(let callsign in  this.pilots){
                    if(this.pilots[callsign].liveflag !== this.liveflag){
                        if(this.state.selectedPilot === this.pilots[callsign]){
                            this.removePilotSelected();
                        }
                        this.map.removeLayer(this.pilots[callsign].marker);
                        this.pilots[callsign].undefined;
                    }
                }
                this.setState({
                    pilotList:pilotList,
                    atcList:atcList,
                    serverList:servers,
                });

            }catch (e) {
                console.log(e);
            }
        }
    }

    removePilotSelected(){
        this.map.removeLayer(this.state.selectedPilot.displayTracks);
        this.state.selectedPilot.displayTracks = undefined;
        this.setState({
                selectedPilot:undefined
        })
    }

    mapMoveHandle = ()=>{
        const center = this.map.getCenter();
        if(center.lng > 180 ){
            this.map.setView(L.latLng(center.lat,-180));
        }else if(center.lng < -180){
            this.map.setView(L.latLng(center.lat,180));
        }
    };

    getTrackPolyline(latlons){
        return L.polyline.antPath(latlons, {
            paused: false,
            reverse: false,
            delay: 3000,
            dashArray: [10, 20],
            weight: 4,
            opacity: 0.5,
            color: "#FFD700",
            pulseColor: "#FFF"
        });
    }

    pilotSelectedHandle = (pilot)=>{
        const isSelectedPilot = this.state.selectedPilot !== pilot;
        if(this.state.selectedPilot){
            this.removePilotSelected();
        }
        if(isSelectedPilot){
            this.map.panTo(L.latLng(pilot.tracks[pilot.animationIndex].lat,pilot.tracks[pilot.animationIndex].lon));
            this.setState({
                selectedPilot:pilot
            });
            if(pilot.trackLoaded){
                pilot.displayTracks = this.getTrackPolyline(this.getPilotTrackLatLon(pilot));
                pilot.displayTracks.addTo(this.map);
            }else{
                getWhazzupPilotTrackApi(pilot.origin.callsign,pilot.trackStartIndex)
                    .then((response)=>{
                        const track = jsonh.parse(response.data.data);
                        pilot.tracks = track.concat(pilot.tracks);
                        pilot.animationIndex += track.length;
                        pilot.displayTracks = this.getTrackPolyline(this.getPilotTrackLatLon(pilot));
                        pilot.displayTracks.addTo(this.map);
                        pilot.trackLoaded = true;
                    }).catch((e)=>{
                        console.log(e.message);
                })
            }


        }

    };

    getPilotTrackLatLon(pilot,all = false){
        const latlons  = [];
        const tracks = pilot.tracks;
        for(let i = 0;i<tracks.length;i++){
            if(!all && i>=pilot.animationIndex){
                break;
            }
            latlons.push([tracks[i].lat,tracks[i].lon]);
        }
        return latlons;
    }

    moveAirplane(pilot){
        if(pilot.animationIndex < pilot.tracks.length-1){
            pilot.animationIndex++;
            const preTrack = pilot.tracks[pilot.animationIndex-1];
            const track = pilot.tracks[pilot.animationIndex];
            const time = (pilot.tracks[pilot.animationIndex].timestamp-pilot.tracks[pilot.animationIndex-1].timestamp)*1000;
            pilot.marker.setRotationAngle(this.getHeading(track.pbh));
            pilot.marker.moveTo([track.lat,track.lon],time);
            if(pilot.displayTracks)
            {
                const latlon = L.latLng(preTrack.lat,preTrack.lon);
                pilot.displayTracks.addLatLng(latlon);
                this.map.panTo(latlon);
            }

            console.log(pilot.animationIndex,pilot.tracks.length);
            pilot.moveTimeout = setTimeout(()=>{
                this.moveAirplane(pilot)
            },time)
        }else{
            console.log("播放结束");
            pilot.moveTimeout = undefined;
        }

    }



    getHeading(pbh){
        return ((pbh & 4092) >> 2) / 2.84;
    }

    zoomOutSwitch(){
        this.setState({
            consoleZoomOut:!this.state.consoleZoomOut
        })
    }


    listSwitch(to){
        this.setState({
            listViewSelect:to
        })
    }

    render() {
        return (
            <div>
                <Script url="/static/lib/leaflet/leaflet.js" onLoad={this.handleLeafletOnLoad.bind(this)}/>
                {
                    this.state.leafletLoaded?
                        this.pluginList.map((item,index)=>{
                            return  <Script url={item} key={"script_"+index} onLoad={this.handleLeafletPluginLoad.bind(this)}/>
                        })
                    :null
                }
                <View
                    {...this.state}
                    {...this.props}
                    zoomOutSwitch={this.zoomOutSwitch.bind(this)}
                    listSwitch = {this.listSwitch.bind(this)}
                    setRadarLayerOpacity = {this.setRadarLayerOpacity.bind(this)}
                    loadMap = {this.loadMap.bind(this)}
                    removePilotSelected = {this.removePilotSelected.bind(this)}
                />
            </div>
        );
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(OnlineMap);