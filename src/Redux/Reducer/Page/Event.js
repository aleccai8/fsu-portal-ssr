import {
    GET_EVENT_LIST_AXIOS,
    GET_EVENT_LIST_FAILURE,
    GET_EVENT_LIST_SUCCESS, GET_EVENT_STATISTICS_AXIOS, GET_EVENT_STATISTICS_SUCCESS, SET_EVENT_DISPLAY_STATUS
} from "../../Constants/Page/Event";


export default (state = {}, action) => {
    const {type} = action;
    switch (type) {
        case GET_EVENT_LIST_AXIOS:
            return Object.assign({},state,{loadingMore:true,loadingFailed:false});
        case GET_EVENT_LIST_SUCCESS:
            if(action.result.data.data.length > 0){
                const eventList = (state.eventList || []).concat(action.result.data.data);
                return Object.assign({},state,{eventList:eventList,loadingMore:false});
            }else{
                return Object.assign({},state,{loadingMore:false,loadingEnded:true});
            }

        case GET_EVENT_LIST_FAILURE:
            return Object.assign({},state,{loadingFailed:true});
        case GET_EVENT_STATISTICS_SUCCESS:
            return Object.assign({},state,{statistics:action.result.data.data});
        case SET_EVENT_DISPLAY_STATUS:
            return Object.assign({},state,{eventList: [],loadingMore:false,loadingEnded: false,displayStatus:action.status});

    }
    return state;
}