import { DragEvent, useRef, useState } from 'react';
import d_n_d from '../../assets/drag-and-drop-svgrepo-com.svg'
import './IllustrationsMain.css'
import toast from 'react-hot-toast';
import { LoadUserImage } from '../../utils/Api';

function IllustrationsMain() {
    const dNd = useRef<HTMLInputElement>(null)
    const [drag, setDrag] = useState<boolean>(false)
    const formData = new FormData();

    const handleDragNDrop = () =>{
        if(dNd.current?.files == null) return 

        const image = dNd.current.files[0]
        
        formData.append('image', image);

        toast.promise(
            LoadUserImage(formData).then(res=>{
                console.log(res);
            }),
            {
                loading: 'Saving...',
                success: <span>Your avatar was succesfuly update</span>,
                error: <span>Something went wrong</span>,
            }
        )
    }

    const handleDragStart = (e: DragEvent<HTMLDivElement>) =>{
        e.preventDefault()
        setDrag(true)
    }
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) =>{
        e.preventDefault()
        setDrag(false)
    }
    const handleDrop = (e: DragEvent<HTMLDivElement>) =>{
        e.preventDefault()

        var files = [...e.dataTransfer.files]
        formData.append('image', files[0])

        toast.promise(
            LoadUserImage(formData).then(res=>{
                console.log(res);
            }),
            {
                loading: 'Saving...',
                success: <span>Your avatar was succesfuly update</span>,
                error: <span>Something went wrong</span>,
            }
        )
    }

    return ( 
        <div className="il-main">
            <div className="il-load-header">
                <span>Load your work</span>
            </div>
            <div className="il-load-container">
                <button onClick={() => dNd.current?.click()}  className="il-load-btn">Browse</button>
                <span className="il-load-span">or</span>
                <input 
                    type='file' 
                    id='file'
                    onChange={handleDragNDrop}
                    ref={dNd} 
                    style={{display: 'none'}} 
                    multiple={false}/>

                {!drag ? 
                    <div className="il-drag-n-drop"
                            onDragStart={e=> handleDragStart(e)}
                            onDragLeave={e=> handleDragLeave(e)}
                            onDragOver={e=> handleDragStart(e)}>
                        <img draggable={false} src={d_n_d} alt="" style={{width:30, height:30, marginBottom:5}}/>
                        <span>Drag file into area</span>
                    </div>
                    :
                    <div className="il-drag-n-drop il-drag"
                            onDragStart={e=> handleDragStart(e)}
                            onDragLeave={e=> handleDragLeave(e)}
                            onDragOver={e=> handleDragStart(e)}
                            onDrop={e=> handleDrop(e)}>
                        <img draggable={false} src={d_n_d} alt="" style={{width:30, height:30, marginBottom:5}}/>
                        <span>Drop your file</span>
                    </div>
                }

                
            </div>
        </div> 
    );
}

export default IllustrationsMain;