import { NavLink } from "react-router-dom";
import './Header.css'
import { useUserDataStore } from "../../store";
import { useUserFetch } from "../../utils/Hooks";

export const HeaderTitle =() =>{
    return <NavLink to='/' className={"header-title"}><span className="green">I</span>llustartion</NavLink>
}

function Header() {
    const {id, username, avatar} = useUserDataStore((store) => store)
    useUserFetch()

    return ( 
        <header className="mw-1920">
           <HeaderTitle/>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive}) => isActive ? "green" : ""}>home</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='/about' className={({ isActive}) => isActive ? "green" : ""}>about</NavLink>
                    </li> */}
                    <li>
                        <NavLink to='/explore' className={({ isActive}) => isActive ? "green" : ""}>explore</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='/blog' className={({ isActive}) => isActive ? "green" : ""}>blog</NavLink>
                    </li> */}
                </ul>
            </nav>

            {
                !username? (
                    <div className="header-btns">
                        <NavLink to='/login'><button className="header-btn h-b-t">Login</button></NavLink>
                        <NavLink to='/register'><button className="header-btn h-b">Register</button></NavLink>
                    </div>
                ):(
                    <NavLink to={'/lk/' + id} className="header-profile-container">
                        <span>{username}</span>
                        <img src={avatar!} alt="" width={35} height={35} />
                    </NavLink>
                )
            }
        </header> 
    );
}



export default Header;

