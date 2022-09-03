import { useState, useEffect, useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { KolIdContext } from '../context/KolIdContext';
import { AreasofInterestsContext } from '../context/AreasOfInterests';
import { SpecialityContext } from '../context/SpecialityContext';
import { AuthContext } from '../context/AuthContext';
import check from '../images/checkarrow.png';
import ApiConstants from '../constants/ApiConstants';
import axios from '../service/axios';
import qs from 'qs';

import { NotificationContext } from '../context/Notification';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

export default function DisplayAnalyst(props){
	let data = props.Results;
	let results = [];
	const [ displayKol, setdisplayKol ] = useState([ {} ]);
	const [globalRequest,setglobalRequest] = useState(false);
	const [profiles,setProfiles] = useState([]);
	const navigate = useNavigate();
	const AreasofInterestCtx = useContext(AreasofInterestsContext);
	const SpecialityCtx = useContext(SpecialityContext);
	const AuthCtx = useContext(AuthContext);
	const NotificationCtx= useContext(NotificationContext);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.isClicked = false;
				tempobj.isRequested = false;
				tempobj.ID = e.id.raw;
				tempobj.country = e.country.raw;
				tempobj.specialty = e.specialty.raw;
				tempobj.primary_affiliation = e.primary_affiliation.raw;
				tempobj.parent_organization = e.parent_organization.raw;
				tempobj.areas_of_interests = e.areas_of_interests.raw;

				results.push(tempobj);
			});
			setdisplayKol(results);
		},
		[ data ]
	);
	useEffect(()=>{
		const sseForRequestProfile = new EventSource(
			"http://localhost:8080/api/v1/sse"
		  );
		  sseForRequestProfile.onopen = (e) => {
			// console.log("Connected !");
		  };
		  sseForRequestProfile.addEventListener("all-request-profile-event", (event) => {
			let jsonData = JSON.parse(event.data);
			setProfiles(jsonData);
			// console.log(jsonData);

		  });
		  sseForRequestProfile.onerror = (error) => {
			console.log("SSE For sseForRequestProfile error", error);
			sseForRequestProfile.close();
		  };

		  return () => {
			sseForRequestProfile.close();
		  };

	},[globalRequest])
	// useEffect(()=>{
	// 		if (!listening) {
	// 	        eventSource = new EventSource("http://localhost:8080/api/v1/approve/test");
	// 	        eventSource.onmessage = (event) => {
	// 	            console.log(event?.data);
	// 	        }
	// 	        eventSource.onerror = (err) => {
	// 	            console.error("EventSource failed:", err);
	// 	            eventSource?.close();
	// 	        }
	// 	        setListening(true)
	// 	    }
	// 	    return () => {
	// 	            eventSource?.close();
	// 	            console.log("event closed")
	// 	    }
	// 	},[globalRequest])
	const viewMoreClick = (index) => {
		const newdisplayKol = [ ...displayKol ];
		newdisplayKol[index].isClicked = true;
		setdisplayKol(newdisplayKol);
	};
	const viewLessClick = (index) => {
		const newdisplayKol = [ ...displayKol ];
		newdisplayKol[index].isClicked = false;
		setdisplayKol(newdisplayKol);
	};

	const RequestProfile = (index,id) =>{
		const date = new Date();
		const newdisplayKol = [...displayKol];
		setglobalRequest(!globalRequest);
		newdisplayKol[index].isRequested = true;
		setdisplayKol(newdisplayKol);
		// console.log("Access Token->"+AuthCtx.Auth.access_token);
		//console.log("Refresh Token->"+AuthCtx.Auth.refresh_token);
	 	// console.log("Username->"+AuthCtx.Auth.enteredName);
		// console.log("ID->"+id);
		
		const data = {
			"username":AuthCtx.Auth.enteredName,
			"createdAt":date,
			"kolProfileId":id
		}
		const RequestProfileToBackend = async()=>{
		const access_token = AuthCtx.Auth.access_token;
		const options = {
			method:'POST',
			headers:{
				"content-type": "application/json",
				'Authorization':'Bearer '+access_token,
			},
			data:data,
			url:ApiConstants.REQUEST_PROFILE,
		};
		try{
			const response = await axios(options);
			if(response?.status === 200){
				console.log("Success");
			}
		}catch(error){
			console.log(error);
		}
	}
		RequestProfileToBackend();
	}
	return (
		<div>
			{NotificationCtx.setNotificationHandler(profiles)}
			{displayKol.map((e, index) => (
				<div className="Card">
					<h2 style={{ color: '#3259ED', fontFamily: 'Archivo' }}>{e.ID}</h2>
					<div className="Card-field">
						<p>
							areas_of_interests :{' '}
							{e.areas_of_interests &&
								e.areas_of_interests.map((e, index) => (
									<span className="area-card">
										<button
											onClick={() => {
												AreasofInterestCtx.setAreasofInterestsHandler(e);
												navigate('/analyst-areahome');
											}}
										>
											{e}&#44;&nbsp;
										</button>
									</span>
								))}
						</p>
						<p>
							Specialty :{' '}
							{e.specialty &&
								e.specialty.map((e, index) => (
									<span className="area-card">
										<button
											onClick={() => {
												SpecialityCtx.setSpecialityHandler(e);
												navigate('/analyst-specialtyhome');
											}}
										>
											{e}&#44;&nbsp;
										</button>
									</span>
								))}
						</p>
						<p>Country : {e.country}</p>
						{e.isClicked ? null : (
							<button
								onClick={() => {
									viewMoreClick(index);
								}}
							>
								View more
							</button>
						)}
						{e.isClicked ? (
							<div>
								<p>Primary Affiliation :{e.primary_affiliation}</p>
								<p>Parent Organization : {e.parent_organization}</p>
								<button
									onClick={() => {
										viewLessClick(index);
									}}
								>
									View Less
								</button>
							</div>
						) : null}
						{e.isRequested ? (
							<div className='profile-requested'>
								<p><img src={check}  alt='check'/>
									Profile Requested</p>
							</div>
						):(
							<button
						className='request-button'
							onClick={() => {
								RequestProfile(index,e.ID);
							}}
						>
							{' '}
							Request KOL profile
						</button>	
						
						)
						}	

					</div>
				</div>
			))}
		</div>
	);
 }