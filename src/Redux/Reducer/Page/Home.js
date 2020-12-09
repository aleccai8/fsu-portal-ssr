import {GET_TIME_RANK_DATA_SUCCESS} from "./../../Constants/Page/Home"

export default (state = {}, action) => {
    const {type} = action;
    switch (type) {
        case GET_TIME_RANK_DATA_SUCCESS: {
            return Object.assign({},state,{timeRank: action.result.data})
        }

    }
    return state;
}