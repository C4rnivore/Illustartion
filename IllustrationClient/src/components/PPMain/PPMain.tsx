import { useEffect, useRef, useState } from 'react';
import { useUserDataStore } from '../../store';
import PPDescription from '../PPDescription/PPDescription';
import PPEdit from '../PPEdit/PPEdit';
import './PPMain.css'
import {v4 as uuidv4} from 'uuid';
import { LoadUserPfp } from '../../utils/Api';
import toast from 'react-hot-toast';

function PPMain() {
    const input = useRef<HTMLInputElement>(null)
    const {id, username, email, avatar, description, updateUserAvatar} = useUserDataStore((store)=>store)

    function handleImageInputChange(){
        if(input.current?.files == null) return 

        const image = input.current.files[0]
        const formData = new FormData();
        formData.append('image', image);

        toast.promise(
            LoadUserPfp(formData).then(res=>{
                updateUserAvatar(res.avatarLink)
            }),
            {
                loading: 'Saving...',
                success: <span>Your avatar was succesfuly update</span>,
                error: <span>Something went wrong</span>,
            }
        )

    }

    const onIamgeClick = () => {
        if(input.current == null) return
        input.current.click();
    };

    return ( 
        <div className="pp-main-content">
            <div className="pp-m-c-top">
                <input 
                    type='file' 
                    id='file'
                    onChange={handleImageInputChange}
                    ref={input} 
                    style={{display: 'none'}} 
                    multiple={false}/>
                <img 
                    onClick={onIamgeClick} 
                    className='pp-top-img' 
                    src={avatar!} 
                    alt="" />
                <div className="pp-top-text">
                    <span className='pp-top-name'>{username}</span>
                    <span className='pp-top-id'>{description}</span>
                </div>
            </div>
            <div className="pp-m-c-bottom">
                <PPEdit/>
                <PPDescription/>
            </div>
        </div> 
    );
}

export default PPMain;