import PPMenu from "../../components/PPMenu/PPMenu";
import './IllustrationsPage.css'
import bgImage from '../../assets/main_bg_cropped.jpg'
import { useUserFetch } from "../../utils/Hooks";
import IllustrationsMain from "../../components/IllustrationsMain/IllustrationsMain";

function IllustrationPage() {
    useUserFetch()

    return ( 
        <section className='pp-section'>
            <PPMenu/>
            <div className="pp-main">
                <div className="pp-title-container">
                    <span className='pp-title'>Illustrations</span>
                </div>
                <img className='pp-bg' src={bgImage} alt="" />
                <IllustrationsMain/>
            </div>
        </section>
     );
}

export default IllustrationPage;