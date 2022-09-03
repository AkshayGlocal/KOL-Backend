import logo from '../images/glocalLogo2.png';
import '../css/DisplaySearchandProfile.css';

import { DropdownButton,Dropdown } from 'react-bootstrap';
export default function DisplayHeader(){

   
    return(
        <div className="Search-Box-header">
            <div className="image-logo">
                <img src={logo} alt={"glocalmind"} />
            </div>
            <div className="profile-logout">
                <DropdownButton className="profile-logout-dropdown" id="dropdown-basic-button" title="Admin">
                    <Dropdown.Item href="/login">Sign Out</Dropdown.Item>
                </DropdownButton>
            
            </div>
         </div>
    )
}