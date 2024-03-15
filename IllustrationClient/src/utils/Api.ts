import axios from 'axios';
import { LoginFields, UserDTO } from './Types';
import { api } from '../App';
axios.defaults.withCredentials = true

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
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
    })
    return response.data
}


export const GoogleLoginUser = async (access_token:string) =>{
    let g_response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
        },
    })

    let params:UserDTO = {
        id: g_response.data.id,
        avatar:g_response.data.picture,
        email: g_response.data.email,
        username: g_response.data.given_name,
        password:'google'
    }

    const response = await axios({
        method:'POST',
        data:params,
        url:api + '/google/user/login',
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })
    return response.data
}

export const GetUserData = async () =>{
    const response = await axios({
        method:'GET',
        url:api + '/api/user/get',
        responseType: 'json'
    })
    return response.data
}

export const GetUserDataById = async (id:string) =>{
    const response = await axios({
        method:'GET',
        url:api + '/api/user/get/'+ id,
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}