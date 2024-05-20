import axios from 'axios';
import { LoginFields, UserDTO } from './Types';
import { api } from '../App';
import { EditProfileFields } from '../components/PPEdit/PPEdit';
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

export const UpdateUserMainData = async (data:EditProfileFields) =>{
    const response = await axios({
        method:'PUT',
        url:api + '/api/user/update/main',
        data: data,
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}

export const UpdateUserDescription = async (uid:string, descr:string) =>{
    const response = await axios({
        method:'PUT',
        url:api + '/api/user/update/description',
        data: {
            id:uid,
            description:descr
        },
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}

export const LoadUserPfp = async (formData:FormData) =>{
    const response = await axios({
        method:'POST',
        url:api + '/api/user/update/avatar',
        data: formData,
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}

export const LoadUserImage = async (formData:FormData) =>{
    const response = await axios({
        method:'POST',
        url:api + '/api/user/load/image',
        data: formData,
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}

export const GetImagesForUser = async () =>{
    const response = await axios({
        method:'GET',
        url:api + '/api/images',
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}

export const DeleteImageById = async (imageId:string) =>{
    const response = await axios({
        method:'DELETE',
        url:api + '/api/images/delete/'+ imageId,
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}

export const GetImagesForMain = async () =>{
    const response = await axios({
        method:'GET',
        url:api + '/api/images/get/',
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}
export const GetImagesDataForMain = async (imageId:string, authorId:string) =>{

    const response = await axios({
        method:'GET',
        url:api + '/api/images/data/get/' + imageId + '/'+ authorId,
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}

export const Logout = async ()=>{
    const response = await axios({
        method:'GET',
        url:api + '/api/user/logout',
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Controll-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    })

    return response.data
}