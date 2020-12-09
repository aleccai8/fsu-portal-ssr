import axios from "./Axios"

export const onlineTimeRankApi = ()=> axios.get('/onlineTimeRank');
export const loginApi = (param)=> axios.post('/login',param);
export const logoutApi = ()=>axios.post('/logout');
export const getAvatarApi = (uid,size,type)=>axios.get('/user/avatar',{params:{uid,size,type}});
export const getUserSettingHomeApi =  ()=>axios.get('/user/setting/home');
export const userSignInApi = ()=>axios.post("/user/credit/sign_in");
export const getRecommendCallsignApi = ()=>axios.get("/user/callsign/recommend");
export const searchCallsignApi = (callsign)=>axios.get("/user/callsign/search",{params:{callsign}});
export const registerCallsignApi = (callsign,password)=>axios.post("/user/callsign/register",{callsign,password});
export const getUserCallsignApi = ()=>axios.get('/user/callsign/info');
export const setUserCallsignPassword = (password)=>axios.post('/user/callsign/set_password',{password});
export const getUserCountryList = ()=>axios.get('/user/setting/country_list');
export const getUserSettingProfile = ()=>axios.get('/user/setting/profile');
export const setUserSettingProfile = (role,country,sex,card)=>axios.post('/user/setting/profile',{role,country,sex,card});
export const getWhazzupJsonApi = (startTime = undefined)=>axios.get('/whazzup/json',{params:{startTime}});
export const getWhazzupPilotTrackApi = (callsign,endIndex)=>axios.get('/whazzup/pilot_track',{params:{callsign,end_index:endIndex}});
export const getEventListApi = (page,status,type)=>axios.get('/event',{params:{page,status,type}});
export const getEventStatisticsApi = ()=>axios.get('/event/statistics');