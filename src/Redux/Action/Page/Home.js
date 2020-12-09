import {GET_TIME_RANK_DATA_AXIOS,GET_TIME_RANK_DATA_SUCCESS,GET_TIME_RANK_DATA_FAILER} from "../../Constants/Page/Home";
import {onlineTimeRankApi} from "./../../../Api/FSU"

export const getTimeRankData = ()=>{
    return{
        types:[
            GET_TIME_RANK_DATA_AXIOS,
            GET_TIME_RANK_DATA_SUCCESS,
            GET_TIME_RANK_DATA_FAILER,
        ],
        sync:()=>onlineTimeRankApi()
    }
};