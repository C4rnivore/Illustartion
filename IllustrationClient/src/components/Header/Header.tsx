import { NavLink } from "react-router-dom";
import './Header.css'

function Header() {
    return ( 
        <header className="mw-1920">
            <NavLink to='/' className={"header-title"}><span className="green">I</span>llustartion</NavLink>
            
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive}) => isActive ? "green" : ""}>home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' className={({ isActive}) => isActive ? "green" : ""}>about</NavLink>
                    </li>
                    <li>
                        <NavLink to='/explore' className={({ isActive}) => isActive ? "green" : ""}>explore</NavLink>
                    </li>
                    <li>
                        <NavLink to='/blog' className={({ isActive}) => isActive ? "green" : ""}>blog</NavLink>
                    </li>
                </ul>
            </nav>

            <div className="header-btns">
                <NavLink to='/login'><button className="header-btn h-b-t">Login</button></NavLink>
                <NavLink to='/register'><button className="header-btn h-b">Register</button></NavLink>
            </div>
        </header> 
    );
}

export default Header;