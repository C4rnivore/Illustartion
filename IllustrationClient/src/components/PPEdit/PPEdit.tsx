import { SubmitHandler, useForm } from 'react-hook-form';
import './PPEdit.css'
import { useUserDataStore } from '../../store';
import { UpdateUserMainData } from '../../utils/Api';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export type EditProfileFields={
    id?:string,
    username:string,
    email:string
}

function PPEdit() {
    const {id, username, email, avatar, updateUserStore} = useUserDataStore((store) => store)
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<EditProfileFields>();

    
    const onSubmit:SubmitHandler<EditProfileFields> = async (data) =>{
        if (!id) return

        let params:EditProfileFields = {
            id:id,
            username: data.username.length == 0 ? username! : data.username,
            email: data.email.length == 0? email! : data.email
        }

        if (params.username == username && params.email == email){
            toast.success('Nothing to change')
            return
        }

        toast.promise(
            UpdateUserMainData(params).then(res=>{
                updateUserStore({
                    id: params.id!,
                    username: params.username,
                    email:params.email ,
                    avatar: avatar
                })
            }),
            {
                loading: 'Saving...',
                success: <b>Data have been succesfuly updated</b>,
                error: <b>Something goes wrong</b>,
            }
        )
    
    }

    useEffect(()=>{
        console.log(1);
    },[username,email])

    return ( 
        <div className="pp-edit">
            <div className="pp-edit-header">
                <span>Edit information</span>
            </div>
            <form className="pp-edit-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="pp-edit-id pp-edit-row">
                    <label htmlFor="id">Id</label>
                    <input name='id' type="text" disabled={true} value={id!}/>
                </div>
                <div className="pp-edit-username pp-edit-row">
                    <label htmlFor="username">Username</label>
                    <input {...register('username')}  name='username' type="username" placeholder={username!} />
                </div>
                <div className="pp-edit-email pp-edit-row">
                    <label htmlFor="email">Email</label>
                    <input {...register('email',{
                         validate: (value) =>{
                            if(!value.includes('@') && value.length>0){
                                return 'Email must include @'
                            }
                            return true;
                        }
                    })} name='email' type="text" placeholder={email!} />
                </div>
                {errors.email && (
                    <span className='form-error'>{errors.email.message}</span>
                )}
                <button disabled={isSubmitting} className='form-submit-btn pp-btn' type='submit'>{isSubmitting?'Loading...':'Apply'}</button>
            </form>
        </div> 
    );
}

export default PPEdit;