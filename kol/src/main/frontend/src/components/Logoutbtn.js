import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import './logoutbtn.css';
import { useContext, useState } from 'react';
import { NotificationContext } from '../context/Notification';
import LaunchIcon from '@mui/icons-material/Launch';
import profileimage from '../images/profile.jpg';
import { AuthContext } from '../context/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

import { KolIdContext } from '../context/KolIdContext';
export default function Logoutbtn() {

	const KolIdCtx = useContext(KolIdContext);

	const navigate = useNavigate();
	const HandleClick = () => {
		navigate('/login');
	};
	const [ notificationClick, setnotificationClick ] = useState(false);
	const [Signoutclick,setSignoutClick]= useState(false);
	const NotificationCtx = useContext(NotificationContext);
	const AuthCtx = useContext(AuthContext);


	const notificationclickHandler = () => {
		setnotificationClick(!notificationClick);
		setSignoutClick(false);
	};
	const SignoutClickHandler = ()=>{
		setSignoutClick(!Signoutclick);
		setnotificationClick(false);
	}
	const ProfileClickHandler = (e)=>{

		KolIdCtx.setkolIdHandler(e);
		navigate('/profiles');
	}
	const roles = AuthCtx.Auth?.roles;
	
	return (
		<div className="logout">
				<div className="notification-profile">
				<button onClick={notificationclickHandler} className='notify-container'>
					<Badge badgeContent={NotificationCtx.Notification.length} color="primary">
						<MailIcon color="action" />
					</Badge>
				</button>

					{notificationClick ? (
						<div className='open-notify'>
							<div className='approved-heading'>
							 <p>Approved Profiles</p>
							</div>
							{NotificationCtx.Notification.map(e=><button onClick={
								()=>{
									ProfileClickHandler(e);
								}
							} className='profile'>&nbsp;{e}<LaunchIcon className='icon-link'/></button>)}

						</div>
					) : null}
			</div>
				
			{/* <button onClick={HandleClick} className="sign-out"> */}
			<button className='logout-new' onClick={SignoutClickHandler}>
				<img src={profileimage} alt='profile'/>
			</button>
			{Signoutclick ?(
				<div className='signout-dropdown'>
					<button><EmailIcon/>&nbsp;{AuthCtx.Auth?.enteredName}</button>
					<button><EditIcon/>&nbsp;Edit Profile(coming soon)</button>
					<button onClick={HandleClick}><LogoutIcon/>&nbsp;Log out</button>
				</div>
			):null}
		</div>
	);
}
