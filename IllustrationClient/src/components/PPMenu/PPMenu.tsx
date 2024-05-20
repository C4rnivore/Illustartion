import { HeaderTitle } from '../Header/Header';
import { useUserDataStore } from '../../store';
import './PPMenu.css'
import { NavLink } from 'react-router-dom';
import { useUserFetch } from '../../utils/Hooks';
import LogoutButton from '../LogoutButton/LogoutButton';

function PPMenu() {
    const id = useUserDataStore((store) => store.id)
    useUserFetch()
    return ( 
        <nav className='pp-nav'>
            <HeaderTitle/>
            <ul>
                <li>
                  <NavLink className={({ isActive}) => isActive ? "green" : ""}  to={'/lk/'+ id}>profile</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive}) => isActive ? "green" : ""} to={'/illustrations/'+ id}>illustrations</NavLink>
                </li>
            </ul>
            <LogoutButton/>
        </nav> 
    );
}

export default PPMenu;