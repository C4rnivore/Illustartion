import { useEffect, useState } from 'react';
import './Explore.css'
import { GetImagesForMain } from '../../utils/Api';
import { IMG } from '../../utils/Types';
import ImageCard from '../../components/ImageCard/ImageCard';

function Explore() {
    const [images, setImages] = useState<Array<IMG>>(null!)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(()=>{
        GetImagesForMain().then(res => {
            setImages(res)
            setIsLoading(false)
        }).catch()
    },[])

    if(isLoading)
        return(<span>Loading</span>)
    return ( 
        <section className='explore'>
            {images.map((img)=>(
                <ImageCard key={img.id} img={img}/>
            ))}
        </section> 
     );
}

export default Explore;