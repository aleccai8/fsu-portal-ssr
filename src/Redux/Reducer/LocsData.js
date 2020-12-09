import {SET_SSR_PAGE_STATUS} from "./../Constants/LocsData";

const initialState={
    ssrPage:false,
};

export default (state = initialState,action)=>{
    const {type} = action;
    switch (type) {
        case SET_SSR_PAGE_STATUS:{
            console.log("SET");
            return Object.assign({},state,{ssrPage: action.status})
        }


    }
    return state;
}