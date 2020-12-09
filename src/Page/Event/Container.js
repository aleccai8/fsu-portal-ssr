import React, {PureComponent} from 'react';
import View from "./View"
import {loadUserInfo, setUserAvatar} from "../../Redux/Action/UserInfo";
import cookie from "react-cookies";
import {connect} from "react-redux";
import {getEventList, getEventStatistics, setEventDisplayStatus} from "../../Redux/Action/Page/Event";

const mapStateToProps = state =>{
    return {
        ...state.userInfo,
        ...state.pageData.event,
    }
};

const mapDispatchToProps = dispatch => {
    return{
        getEventList:(page,status,type)=>dispatch(getEventList(page,status,type)),
        getEventStatistics:()=>dispatch(getEventStatistics()),
        setEventDisplayStatus:(status)=>dispatch(setEventDisplayStatus(status))
    }
};



class Event extends PureComponent{

    static async asyncData(store) {
        const { getEventList,getEventStatistics } = mapDispatchToProps(store.dispatch);
        await getEventList();
        await getEventStatistics();
    }

    page = 1;

    status = undefined;

    constructor(props){
        super(props);
    }

    componentDidMount() {
        const {eventList,statistics} = this.props;
        eventList || this.props.getEventList();
        statistics || this.props.getEventStatistics();
    }

    onClickMoreButton = ()=>{
        console.log(this.props.status);
        this.props.getEventList(++this.page,this.props.displayStatus);
    };

    onClickStatusButton = (status)=>{
        this.props.setEventDisplayStatus(status);
        this.page = 1;
        this.props.getEventList(1,status);
    };


    render() {
        return (
            <View
                onClickMoreButton={this.onClickMoreButton}
                onClickStatusButton={this.onClickStatusButton}
                {...this.state}
                {...this.props}
            />
        );
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Event)