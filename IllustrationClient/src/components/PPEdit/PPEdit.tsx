import { SubmitHandler, useForm } from 'react-hook-form';
import './PPEdit.css'
import { useUserDataStore } from '../../store';
import { LoginFields } from '../../utils/Types';

type EditProfileFields={
    id?:string,
    username:string,
    email:string
}

function PPEdit() {
    const {id, username, email} = useUserDataStore((store) => store)
    const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<EditProfileFields>();
    
    const onSubmit:SubmitHandler<EditProfileFields> = async (data) =>{

        let params:EditProfileFields = {
            username: data.email,
            email: data.email
        }
        console.log(params);
        
    }

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
                    <label htmlFor="id">Username</label>
                    <input name='id' type="text" placeholder={username!} />
                </div>
                <div className="pp-edit-email pp-edit-row">
                    <label htmlFor="id">Email</label>
                    <input  name='id' type="text" placeholder={email!} />
                </div>
                <button disabled={isSubmitting} className='form-submit-btn' type='submit'>{isSubmitting?'Loading...':'Apply'}</button>
            </form>
        </div> 
    );
}

export default PPEdit;