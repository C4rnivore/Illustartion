import axios from 'axios';
import { LoginFields, UserDTO } from './Types';
import { api } from '../App';

export const RegisterUser = async (params:UserDTO) => {
    const response = await axios({
        method:'POST',
        data:params,
        url:api + '/api/user/create',
        responseType: 'json'
    })

    return response.data
}

export const LoginUser = async (params:LoginFields) =>{
    const response = await axios({
        method:'POST',
        data:params,
        url:api + '/api/user/login',
        responseType: 'json'
    })

    return response.data
}


export const GoogleLoginUser = async (access_token:string) =>{
    let g_response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json'
        }
    })

    let params:UserDTO = {
        id: g_response.data.id,
        email: g_response.data.email,
        username: g_response.data.given_name,
        password:'google'
    }

    const response = await axios({
        method:'POST',
        data:params,
        url:api + '/google/user/login',
        responseType: 'json'
    })

    return response.data
}