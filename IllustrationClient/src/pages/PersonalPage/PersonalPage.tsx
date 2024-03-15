import { useNavigate, useParams } from 'react-router-dom';
import './PersonalPage.css'
import { useUserDataStore } from '../../store';
import PPMenu from '../../components/PPMenu/PPMenu';
import bgImage from '../../assets/main_bg_cropped.jpg'
import PPMain from '../../components/PPMain/PPMain';

function PersonalPage() {
    let { userId } = useParams();
    const {id} = useUserDataStore((store) => store)
    const navigate = useNavigate()

    if (userId !== id){
        return (<>
            <h1>'Access to requested page is not allowed'</h1>
            <button onClick={()=>navigate('/')}>To main page</button>
        </>)
    }
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

export default PersonalPage;