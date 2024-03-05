import axios from 'axios';
import { UserDTO } from './Types';
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

