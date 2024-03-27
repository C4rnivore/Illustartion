import { useUserDataStore } from '../../store';
import PPDescription from '../PPDescription/PPDescription';
import PPEdit from '../PPEdit/PPEdit';
import './PPMain.css'

function PPMain() {
    const {description, username, avatar} = useUserDataStore((store) => store)

    return ( 
        <div className="pp-main-content">
            <div className="pp-m-c-top">
                <img className='pp-top-img' src={avatar!} alt="" />
                <div className="pp-top-text">
                    <span className='pp-top-name'>{username}</span>
                    <span className='pp-top-id'>{description}</span>
                </div>
            </div>
            <div className="pp-m-c-bottom">
                <PPEdit/>
                <PPDescription/>
            </div>
        </div> 
    );
}

export default PPMain;