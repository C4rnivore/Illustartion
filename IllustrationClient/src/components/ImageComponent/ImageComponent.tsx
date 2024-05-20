import './ImageComponent.css'
import { IMG } from '../../utils/Types';
import { DeleteImageById } from '../../utils/Api';
import toast from 'react-hot-toast';

function ImageComponent({data}:{data:IMG}) {
    function deleteImage(): void {
        toast.promise(
            DeleteImageById(data.id),
            {
                loading: 'Saving...',
                success: <span>Your image was succesfuly deleted</span>,
                error: <span>Something went wrong</span>,
            }
        )
    }

    return (
        <div className="img-comp-wrapper">
            <img className='img-comp' src={data.link} style={{maxHeight:300}}/>
            <button className='close-comp' onClick={() => deleteImage()}>X</button>
            <span className='likes-img-comp'>Likes:{data.likes}</span>
        </div>);
}

export default ImageComponent;