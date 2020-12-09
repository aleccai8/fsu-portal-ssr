import {SET_SSR_PAGE_STATUS} from "./../Constants/LocsData";


export const setSSRPageStatusAction = (status)=>({
    type: SET_SSR_PAGE_STATUS,
    status:status
});
