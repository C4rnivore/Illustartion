import {SubmitHandler, useForm} from 'react-hook-form'
import { NavLink } from 'react-router-dom';
import { LoginFields } from '../../utils/Types';
import { useGoogleLogin } from '@react-oauth/google';
import './LoginForm.css'
import { LoginUser, GoogleLoginUser } from '../../utils/Api';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<LoginFields>();
    const [cookies, setCookie] = useCookies(['access_token'])
    const navigate = useNavigate();

    const onSubmit:SubmitHandler<LoginFields> = async (data) =>{
        let params:LoginFields = {
            email: data.email,
            password: data.password
        }

        LoginUser(params)
            .then(res=>{
                setCookie('access_token', res.access_token,{sameSite:true, secure:true, maxAge:604800})
                navigate('/')
            })
            .catch(err=>{
                let res = err.response
                setError(res.data.err_type,{
                    message: res.data.message
                })
            })
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => GoogleLoginUser(codeResponse.access_token).then(res=> [
            setCookie('access_token', res.access_token,{sameSite:true, secure:true, maxAge:604800}),
            navigate('/')
        ]),
        onError: (error) => console.log('Login Failed:', error)
    });

    return ( 
        <form className='reg-form' onSubmit={handleSubmit(onSubmit)}>
            <NavLink to='/' className={"form-title"}><span className="green">I</span>llustartion</NavLink>
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
            <button disabled={isSubmitting} className='form-submit-btn' type='submit'>{isSubmitting?'Loading...':'Login'}</button>
            <span className='span-sep'>or</span>
            <button className='google-btn' onClick={login}>Sign in with Google</button>
            <span className='bottom-form-span'>Don't have an account? <NavLink className='green' to='/register'>Register.</NavLink></span>
        </form>
    );
}

export default LoginForm;