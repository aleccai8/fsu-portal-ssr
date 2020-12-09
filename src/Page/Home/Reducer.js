import {GET_TEST_DATA,SET_LOADED_STATUS} from "./Action/ACTION_TYPE";

const initialState={
    loaded:false,
    data:[],
};

export default (state = initialState,action)=>{
    const {type} = action;
    switch (type) {
        case GET_TEST_DATA:{
            return state.loaded?state:Object.assign({},state,
                {data:action.sync()});

        }
        case SET_LOADED_STATUS:{
            console.log(action.status);
            return Object.assign({},state,{loaded: action.status})
        }

    }
    return state;
}