import DisplayHeader from "../components/DisplayHeader";
import { useNavigate } from 'react-router-dom';
import { ImageLoading } from './Image';

import '../css/ProfileLayout.css';
import ProfileSnapshot from "./ProfileSnapshot";
import PhoneAddress from "../Admin-components/API-components/PhoneAddress";
export default function ProfileLayout(){
    const navigate = useNavigate();
    return (
        <div className="layout-outer-container">
            <div className="layout-header-display">
                <DisplayHeader/>
            </div>
            <div className="layout-back-container">

                <button onClick={()=>{
											navigate(-1);
										}}>
                    <div className="back-button">BACK</div>
                </button>                         
            </div>
            <div className="image-profile-container">
                <div className="image-container">
                    <ImageLoading />	
                    <PhoneAddress />		
                </div>
             <ProfileSnapshot />		
            </div>
        </div>
    )
}