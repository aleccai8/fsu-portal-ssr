import axios from "axios"
import cookie from "react-cookies"
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => {
        let token = response.headers.authorization;
        if(token)
        {
            cookie.save('jwtToken',token.replace('Bearer ',''));
        }

        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    cookie.remove('jwtToken');
                    window.location.href = '/login';
            }
            let token = error.response.headers.authorization;
            if(token)
            {
                cookie.save('jwtToken',token.replace('Bearer ',''));
            }
        }
        throw error   // 返回接口返回的错误信息
    });



export const setAxiosAuthorization = (token)=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    console.log(axios.defaults.headers);
};

const token = cookie.load('jwtToken');

if(token){
    setAxiosAuthorization(token);
}

export default axios;

