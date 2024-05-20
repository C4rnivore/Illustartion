import {SubmitHandler, useForm} from 'react-hook-form'
import './RegForm.css'
import { NavLink } from 'react-router-dom';
import { RegesitrationFields, UserDTO } from '../../utils/Types';
import { RegisterUser } from '../../utils/Api';
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from "react-router-dom";



function RegForm() {
    const {register, handleSubmit,setError, formState:{errors, isSubmitting}, watch} = useForm<RegesitrationFields>();
    const navigate = useNavigate();

    const onSubmit:SubmitHandler<RegesitrationFields> = async (data) =>{
        let params:UserDTO = {
            id: uuidv4(),
            avatar:'',
            username: data.username,
            email: data.email,
            password: data.password
        }

        RegisterUser(params)
        .then(()=>{
            navigate('/')
        })
        .catch(err=>{
            console.log(err);
            setError('email',{
                message:err.response.data.message
            })
        });
    }

    return ( 
        <form className='reg-form' onSubmit={handleSubmit(onSubmit)}>
            <NavLink to='/' className={"form-title"}><span className="green">I</span>llustartion</NavLink>
            <div className="form-row">
                <label htmlFor="username">Username</label>
                <input {...register('username',{
                    required:'Username is required'
                })} name='username' type="text" className={errors.username? 'error-input':''} placeholder='Start typing your username'/>
                {errors.username && (
                    <span className='form-error'>{errors.username.message}</span>
                )}
            </div>
            
            <div className="form-row">
                <label htmlFor="email">Email</label>
                <input  {...register('email',{
                    required:'Email is required',
                    validate: (value) =>{
                        if(!value.includes('@')){
                            return 'Email must include @'
                        }
                        return true;
                    }
                })} name='email' type="text" className={errors.email? 'error-input':''} placeholder='Start typing your email'/>
                {errors.email && (
                    <span className='form-error'>{errors.email.message}</span>
                )}
            </div>

            <div className="form-row">
                <label htmlFor="password">Password</label>
                <input {...register('password',{
                    required:"Password is required",
                    minLength:{
                        message:'Password is too short. Minimal length is 6',
                        value:6
                    }
                })} name='password' type="password" className={errors.password? 'error-input':''} placeholder='Start typing your password'/>
                {errors.password && (
                    <span className='form-error'>{errors.password.message}</span>
                )}
            </div>

            <div className="form-row">
                <label htmlFor="repeatedPassword">Repeat password</label>
                <input {...register('repeatedPassword',{
                    required:"Password is required",
                    minLength:{
                        message:'Password is too short. Minimal length is 6',
                        value:6
                    },
                    validate: (value) =>{
                        if(watch('password') != value){
                            return 'Passwords are different'
                        }
                        return true;
                    }
                })} name='repeatedPassword' type="password" className={errors.repeatedPassword? 'error-input':''} placeholder='Please repeat your password'/>
                {errors.repeatedPassword && (
                    <span className='form-error'>{errors.repeatedPassword.message}</span>
                )}
            </div>
            <button disabled={isSubmitting} className='form-submit-btn' type='submit'>{isSubmitting?'Loading...':'Register'}</button>
            <span className='bottom-form-span'>Already have an account? <NavLink className='green' to='/login'>Login.</NavLink></span>
        </form>
     );
}

export default RegForm;