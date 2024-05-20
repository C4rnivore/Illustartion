import './LogoutButton.css'
import { Logout } from '../../utils/Api';

function LogoutButton() {
    const handleLogOut = () =>{
        Logout().then(res=>{
            window.location.replace('/')
        }).catch(err=>console.log(err))
    }

    return ( 
        <button className="logout-btn" onClick={handleLogOut}>
            Log out
        </button>
     );
}

export default LogoutButton;