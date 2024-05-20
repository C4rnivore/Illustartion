import { useState } from 'react';
import './PPDescription.css'
import { UpdateUserDescription } from '../../utils/Api';
import { useUserDataStore } from '../../store';
import toast from 'react-hot-toast';

function PPDescription() {
    const {id, updateUserDescription} = useUserDataStore((store)=>store) 
    const [description, setDescription] = useState<string>(null!)
    var hasChanged = false

    const handleSecriptionChange = (e:any) =>{
        hasChanged = true
        setDescription(e.target.value)
    }

    const handleSubmit = () =>{
        if(!id) return

        toast.promise(
            UpdateUserDescription(id, description? description : '')
            .then(() => {
                updateUserDescription(description? description : '')
            }),
            {
                loading: 'Saving...',
                success: <span>Data have been succesfuly updated</span>,
                error: <span>Something goes wrong</span>,
            }
        )
    }


    return ( 
        <div className="pp-descr">
            <div className="pp-descr-header">
                <span>Add description to your profile</span>
            </div>
            <div className="input-descr-area">
                <textarea name="descr" 
                    id="descr"
                    spellCheck="false"
                    cols={30} 
                    rows={10}
                    onChange={handleSecriptionChange}
                    placeholder={description? description : 'Add description to your profile...'}
                />
                <button 
                onClick={handleSubmit} 
                className={hasChanged? 'form-submit-btn pp-btn' : 'form-submit-btn pp-btn form-submit-btn-disabled'}>Save changes</button>
            </div>
           
        </div>
    );
}

export default PPDescription;