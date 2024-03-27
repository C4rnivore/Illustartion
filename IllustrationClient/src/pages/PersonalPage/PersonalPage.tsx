import { useNavigate, useParams } from 'react-router-dom';
import './PersonalPage.css'
import { useUserDataStore } from '../../store';
import PPMenu from '../../components/PPMenu/PPMenu';
import bgImage from '../../assets/main_bg_cropped.jpg'
import PPMain from '../../components/PPMain/PPMain';
import {  useState } from 'react';
import { useUserFetch } from '../../utils/Hooks';

function PersonalPage() {
    let { userId } = useParams();
    const navigate = useNavigate()
    const [pending, setPending] = useState(false)
    const id = useUserDataStore((store) => store.id)

    useUserFetch({ 
        onFetched: () => setPending(false), 
        onFetching: () => setPending(true) 
    })
    
    

    if (userId !== id && !pending){
        return (<>
            <h1>'Access to the requested page is denied'</h1>
            <button onClick={()=>navigate('/')}>To main page</button>
        </>)
    }

    if(pending){
        return ( <h1>Pending...</h1> )
    }
    else{
        return ( 
            <section className='pp-section'>
                <PPMenu/>
                <div className="pp-main">
                    <div className="pp-title-container">
                        <span className='pp-title'>Page Name</span>
                    </div>
                    <img className='pp-bg' src={bgImage} alt="" />
                    <PPMain/>
                </div>
            </section>
         );
    }
}

export default PersonalPage;