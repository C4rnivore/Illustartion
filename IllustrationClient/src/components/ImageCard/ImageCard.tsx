import { FC, useEffect, useState } from "react";
import { IMG } from "../../utils/Types";
import './ImageCard.css'
import heart from '../../assets/like-empty.svg'
import heartFull from '../../assets/like-full.svg'
import { GetImagesDataForMain } from "../../utils/Api";
import { useUserDataStore } from "../../store";
import toast from 'react-hot-toast';
import ImagePopup from "./ImagePopup/ImagePopup";

const ImageCard:FC<{img:IMG}> = (props)=> {
    const {id} = useUserDataStore((store)=>store)
    const [imgData, setImgData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [likes, setLikes] = useState<number>(0)
    const [liked, setLiked] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(()=>{
        setLikes(props.img.likes)
        GetImagesDataForMain(props.img.id, props.img.author_id).then(
            res=>{
                setImgData(res)
                setIsLoading(false)
            }
        ).catch()
    },[])

    const handleLikeClick = () =>{
        if(!id){
            toast.error('Login or register to interact')
            return
        }
        if(liked){
            setLiked(false)
            setLikes(cur=> cur-1)
        }
        else{
            setLiked(true)
            setLikes(cur=> cur+1)
        }
    }

    const openPopupImg = () =>{
        setIsVisible(true)
    }
    const closePopupImg = () =>{
        setIsVisible(false)
    }

    if(isLoading)
        return(<span>Loading</span>)
    return ( 
        <>
            <ImagePopup visible={isVisible} img={props.img} imgData={imgData} closer={closePopupImg}/>
            <div className="img-card" >
                <img src={props.img.link} alt="" onClick={openPopupImg}/>
                <div className="img-data">
                    <div className="img-left">
                        <span style={{color:'#fff'}} className="img-name">
                            {imgData?.image_name}
                        </span>
                        <span style={{color:'#fff'}} className="img-author">
                            {imgData?.author_name}
                        </span>
                    </div>
                    <div className="img-right">
                        <button onClick={handleLikeClick} className="likes-counter">
                            {liked ? <img src={heartFull} alt="" style={{width:30, height:30}}/> :
                                    <img src={heart} alt="" style={{width:30, height:30}}/>}
                            <span style={{color:'#fff'}}>{likes}</span>
                        </button>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default ImageCard;