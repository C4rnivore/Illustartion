import { useEffect, useState } from 'react';
import './IllustrtationsList.css'
import { GetImagesForUser } from '../../utils/Api';
import { IMG } from '../../utils/Types';
import ImageComponent from '../ImageComponent/ImageComponent';

function IllustrtationsList() {
    const [userImages, setUserImages] = useState<Array<IMG>>()

    useEffect(()=>{
        GetImagesForUser().then(res=>{
            var j = JSON.parse(res)
            console.log(j)
            setUserImages(j)
        })
    },[])

    return ( 
        <div className="il-list">
            <div className="il-list-header">
                <span>Your work</span>
            </div>
            {userImages?
             <div className="images-wrapper">
                {userImages.map((img, index)=>(
                    <ImageComponent key={index} data={img}/>
                ))}
            </div>
            :
            <></>
            }
        </div> 
    );
}

export default IllustrtationsList;