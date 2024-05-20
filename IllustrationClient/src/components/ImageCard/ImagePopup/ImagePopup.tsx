import { FC, useState } from 'react';
import './ImagePopup.css'
import { IMG } from '../../../utils/Types';
import { useUserDataStore } from '../../../store';

const ImagePopup:FC<{visible:boolean, imgData:any, img:IMG, closer:Function}> = (props) => {
    const [comms,setComms] = useState<Array<string>>(['Awesome!', 'Good job!'])
    const [commVal, setCommVal] = useState<string>('')
    const {id} = useUserDataStore((store)=>store)

    const handleInputChange = (e:any)=>{
        setCommVal(e.target.value)
    }
    
    const handleSubmitBtn = () =>{
        var temp = comms
        setComms([...temp, commVal])
        setCommVal('')
    }

    if(!props.visible)
        return <></>

    if(!id)
        return ( 
            <div className="img-popup" >
                <img src={props.img.link} alt="" />
                <div className="popup-data">
                    <div className="popup-top">
                        <div className="popup-img-data">
                            <p className='popup-img-data-i-name'>{props.imgData?.image_name}</p>
                            <span className='popup-img-data-a-name'>by {props.imgData?.author_name}</span>
                        </div>
                        <button onClick={()=>props.closer()}>X</button>
                    </div>
                    <div className="popup-comments">
                        <div style={{marginTop: '40%',marginBottom: '40%', marginLeft:'auto', marginRight:'auto', }}>Login to see commentaries</div>
                    </div>
                </div>
            </div> );

    return ( 
        <div className="img-popup" >
            <img src={props.img.link} alt="" />
            <div className="popup-data">
                <div className="popup-top">
                    <div className="popup-img-data">
                        <p className='popup-img-data-i-name'>{props.imgData?.image_name}</p>
                        <span className='popup-img-data-a-name'>by {props.imgData?.author_name}</span>
                    </div>
                    <button onClick={()=>props.closer()}>X</button>
                </div>
                <div className="popup-comments">
                    {comms.map((comm,index)=>(
                        <span key={index} className='comm-wrapper'>
                            {comm}
                        </span>
                    )) }
                </div>
                <div className="popup-input">
                    <input name='comm-input' type="text" onChange={handleInputChange}/>
                    <button type='submit' onClick={handleSubmitBtn}>{'>'}</button>
                </div>  
            </div>
        </div> );
}


export default ImagePopup;