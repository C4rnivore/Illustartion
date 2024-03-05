import { NavLink } from 'react-router-dom';

import './HomeAnchor.css'

function HomeAnchor() {
    return ( 
        <NavLink className={'anchor-container'} to='/'>
            <span>Home</span>
        </NavLink> 
    );
}

export default HomeAnchor;