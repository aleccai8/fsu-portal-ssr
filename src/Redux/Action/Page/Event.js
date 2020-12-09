import {
    GET_EVENT_LIST_AXIOS,
    GET_EVENT_LIST_FAILURE,
    GET_EVENT_LIST_SUCCESS,
    GET_EVENT_STATISTICS_AXIOS,
    GET_EVENT_STATISTICS_FAILURE,
    GET_EVENT_STATISTICS_SUCCESS,
    SET_EVENT_DISPLAY_STATUS
} from "../../Constants/Page/Event";
import {getEventListApi, getEventStatisticsApi} from "../../../Api/FSU";

export const getEventList = (page,status,type)=>{
    return{
        types:[
            GET_EVENT_LIST_AXIOS,
            GET_EVENT_LIST_SUCCESS,
            GET_EVENT_LIST_FAILURE,
        ],
        sync:()=>getEventListApi(page,status,type)
    }
};

export const getEventStatistics = ()=>{
    return{
        types:[
            GET_EVENT_STATISTICS_AXIOS,
            GET_EVENT_STATISTICS_SUCCESS,
            GET_EVENT_STATISTICS_FAILURE,
        ],
        sync:()=>getEventStatisticsApi()
    }
};

export const setEventDisplayStatus = (status)=>{
    return{
        type:SET_EVENT_DISPLAY_STATUS,
        status,
    }
};