import { useUserDataStore } from '../../store';
import './PPMain.css'

function PPMain() {
    const {id, username, avatar} = useUserDataStore((store) => store)

    return ( 
        <div className="pp-main-content">
            <div className="pp-m-c-top">
                <img className='pp-top-img' src={avatar!} alt="" />
                <div className="pp-top-text">
                    <span className='pp-top-name'>{username}</span>
                    <span className='pp-top-id'>{id}</span>
                </div>
            </div>
            <div className="pp-m-c-bottom">
                
            </div>
        </div> 
    );
}

export default PPMain;