import { HeaderTitle } from '../Header/Header';
import { useUserDataStore } from '../../store';
import './PPMenu.css'
import { NavLink, useNavigate } from 'react-router-dom';

function PPMenu() {
    const id= useUserDataStore((store) => store.id)
    const navigate = useNavigate()
    return ( 
        <nav className='pp-nav'>
            <HeaderTitle/>
            <ul>
                <li>
                    <NavLink to={'/lk/'+ id}>profile</NavLink>
                </li>
                <li>
                    <NavLink to={'/lk/'+ id}>illustrations</NavLink>
                </li>
                <li>
                    <NavLink to={'/lk/'+ id}>statistics</NavLink>
                </li>
            </ul>
            <button className="pp-back" onClick={()=>navigate('/')}>back</button>
        </nav> 
    );
}

export default PPMenu;