import '../css/DisplayNameContent.css';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState,useContext } from "react";
import { AreasofInterestsContext } from '../context/AreasOfInterests';
import { SpecialityContext } from '../context/SpecialityContext';
import npi from '../images/id.png';
import { AuthContext } from '../context/AuthContext';
export default function DisplayNameContent(props){
    let data = props.Results;
	let results = [];
	const navigate = useNavigate();
	const AreasofInterestCtx = useContext(AreasofInterestsContext);
	const SpecialityCtx = useContext(SpecialityContext);
	const AuthCtx = useContext(AuthContext);
	const [ DisplayNameContent, setDisplayNameContent ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.kol_name = e.kol_name.raw;
				tempobj.salutation = e.salutation.raw;
				tempobj.suffix = e.suffix.raw;
				tempobj.specialty =e.specialty.raw;
                tempobj.areas_of_interests = e.areas_of_interests.raw;
				tempobj.npi_id = e.npi_id.raw;
				tempobj.languages = e.languages.raw;
				results.push(tempobj);
			});
			setDisplayNameContent(results);
		},
		[ data ]
	);
	
	return (
		<div>
			
			{DisplayNameContent.map((e, index) => (
				<div className="name-content-wrapper">
                    <p className='name'>{e.salutation}{e.kol_name} <span className='suffix'>{e.suffix}</span></p>
                    <p>
						Specialty :{' '}
							{e.specialty &&
								e.specialty.map((j, index) => (
									<span className="area-card">
										
										<button
											onClick={() => {
												SpecialityCtx.setSpecialityHandler(j);
												AuthCtx.Auth?.roles.map((e)=>{
													if(e==="ROLE_SUPER_ADMIN" || e==="ROLE_ADMIN"){
														navigate('/specialtyhome');
													}else{
														navigate('/analyst-specialtyhome');
													}
												})
											}}
										>
											{j}
											{index != e.specialty.length-1 ? <span>,</span> :<span>.</span>}
										</button>
									</span>
								))}
						
						
					</p>
					
					
					<p>  
					areas_of_interests :{' '}
							{e.areas_of_interests &&
								e.areas_of_interests.map((j, index) => (
									<span className="area-card">
										<button
											onClick={() => {
												AreasofInterestCtx.setAreasofInterestsHandler(j);
												AuthCtx.Auth?.roles.map((e)=>{
													if(e==="ROLE_SUPER_ADMIN" || e==="ROLE_ADMIN"){
														navigate('/areasofinterestshome');
													}else{
														navigate('/analyst-areahome');
													}
												})
											}}
										>
											{j}
											{index != e.areas_of_interests.length-1 ? <span>,</span> :<span>.</span>}
										</button>
									</span>
								))}
					
					 </p>
					 <p>languages : 
					 {e.languages &&
								e.languages.map((j, index) => (
									<span className="area-card">
										
											{j}
											{index != e.languages.length-1 ? <span>, </span>:<span>. </span>}
		
								</span>
								))}
					</p>
					 <p className='npi-logo'><img src={npi} />&nbsp;NPI :&nbsp;{e.npi_id}</p>

                </div>
			))}
		</div>
	);
}