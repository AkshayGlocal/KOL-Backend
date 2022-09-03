import { useState, useEffect, useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { KolIdContext } from '../context/KolIdContext';
import { AreasofInterestsContext } from '../context/AreasOfInterests';
import { SpecialityContext } from '../context/SpecialityContext';
import { GenderContext } from '../context/GenderContext';

export default function DisplayAreaofinteresthome(props) {
	let data = props.Results;
	let results = [];
	const [ displayKol, setdisplayKol ] = useState([ {} ]);
	const navigate = useNavigate();
	const GenderCtx = useContext(GenderContext);
	const KolIdCtx = useContext(KolIdContext);
	const AreasofInterestCtx = useContext(AreasofInterestsContext);
    const SpecialityCtx = useContext(SpecialityContext);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.isClicked = false;
				tempobj.ID = e.id.raw;
				tempobj.kol_name = e.kol_name.raw;
				tempobj.country = e.country.raw;
				tempobj.bio_summary = e.bio_summary.raw;
				tempobj.specialty = e.specialty.raw;
				tempobj.areas_of_interests = e.areas_of_interests.raw;
				tempobj.gender = e.gender.raw;
				tempobj.secondary_address = e.secondary_address.raw;
				tempobj.city = e.city.raw;
				tempobj.parent_organization = e.parent_organization.raw;
				tempobj.latitude = e.latitude.raw;
				tempobj.link = e.link.raw;
				tempobj.middle_initial = e.middle_initial.raw;
				tempobj.extra_phone_numbers = e.extra_phone_numbers.raw;
				tempobj.suffix = e.suffix.raw;
				tempobj.title = e.title.raw;
				tempobj.state = e.state.raw;
				tempobj.justification = e.justification.raw;
				tempobj.career_status = e.career_status.raw;
				tempobj.fax = e.fax.raw;
				tempobj.primary_affiliation = e.primary_affiliation.raw;
				tempobj.department = e.department.raw;
				tempobj.first_name = e.first_name.raw;
				tempobj.longitude = e.longitude.raw;
				tempobj.profession = e.profession.raw;
				tempobj.npi_id = e.npi_id.raw;
				tempobj.languages = e.languages.raw;
				tempobj.address2 = e.address2.raw;
				tempobj.address1 = e.address1.raw;
				tempobj.last_name = e.last_name.raw;
				tempobj.touchpoints = e.touchpoints.raw;
				tempobj.phone = e.phone.raw;
				tempobj.additional_links = e.additional_links.raw;
				tempobj.primary_email = e.primary_email.raw;
				tempobj.salutation = e.salutation.raw;
				tempobj.postal_code = e.postal_code.raw;
				results.push(tempobj);
			});

			setdisplayKol(results);
		},
		[ data ]
	);
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

	return (
		<div>
			{displayKol.map((e, index) => (
				<div className="Card">
					<h2 style={{ color: '#3259ED', fontFamily: 'Archivo' }}>
						<button
							className="Profile-content"
							onClick={() => {
								KolIdCtx.setkolIdHandler(e.ID);
								GenderCtx.setGenderHandler(e.gender);
								
								navigate('/profiles');
							}}
						>
							{e.salutation}&nbsp;
							{e.kol_name}&nbsp;
							{e.suffix}.
						</button>
					</h2>
					<div className="Card-field">

						<p>
						<p>Title :{e.title}</p>
						Specialty :{' '}
							{e.specialty &&
								e.specialty.map((j, index) => (
									<span className='area-card'>
                                        <button
											onClick={() => {
												SpecialityCtx.setSpecialityHandler(j);
												navigate('/specialty');
												
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
									<span className='area-card'>
										<button
											onClick={() => {
												AreasofInterestCtx.setAreasofInterestsHandler(j);
												navigate('/areasofinterests');
												
											}}
										>
											{j}
											{index != e.areas_of_interests.length-1 ? <span>,</span> :<span>.</span>}
										</button>
									</span>
								))}
						</p>
						<p>Primary Affiliation :{e.primary_affiliation}</p>
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
								{/* <p>Gender :{e.gender}</p> */}
								{/* <p>First Name :{e.first_name}</p>
								<p>Middle Initial :{e.middle_initial}</p>
								<p>Last Name :{e.last_name}</p> */}
								{/* <p>Suffix :{e.suffix}</p> */}
								<p>
									Address : {e.address1}&nbsp;,
									{e.city}&nbsp;,
									{e.state}&nbsp;,
									{e.country}.
								</p>
								{/* <p>Country : {e.country}</p>
								<p>City :{e.city}</p>
								<p>State :{e.state}</p>
								<p>Address 1:{e.address1}</p>
								<p>Address 2:{e.address2}</p> */}
								{/* <p>Salutation :{e.salutation}</p> */}
								<p>Postal Code :{e.postal_code}</p>
								<button
									onClick={() => {
										viewLessClick(index);
									}}
								>
									View Less
								</button>
							</div>

						) : null}
					</div>
				</div>
			))}
		</div>
	);
}
