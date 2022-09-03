import '../css/DisplayTabContent.css';
import { useEffect,useState } from "react";
export default function DisplayProfessionalActivities(props){
    let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.id = e.id_kol.raw;
				tempobj.country = e.country.raw;
                tempobj.end_date = e.end_date.raw;
                tempobj.city = e.city.raw;
                tempobj.parent_organization= e.parent_organization.raw;
                tempobj.position_role = e.position_role.raw;
                tempobj.organization_name = e.organization_name.raw;
                tempobj.parent_organization = e.parent_organization.raw;
                tempobj.affiliation_type = e.affiliation_type.raw;
                tempobj.links = e.links.raw;
				results.push(tempobj);
			});
			setdisplayPress(results);
		},
		[data]
	);
    return (
        <div className="diplay-order">
            {displayPress.map((e,index)=>(
                <div className='display-tab-content'>
                    <span className="numbering">{index+1} &nbsp;</span> 
                    <p className='numbering-two'>Country : {e.country}</p>
                    <p>end Date :{e.end_date}</p>
                    <p>city : {e.city}</p>
                    <p>Parent Organization : {e.parent_organization}</p>
                    <p>Position Role : {e.position_role}</p>
                    <p>Organization Name : {e.organization_name}</p>
                    <p>Parent Organization : {e.parent_organization}</p>
                    <p>Affiliation Type : {e.affiliation_type}</p>
                    <p>Links : {e.links}</p>
                </div>
            ))}
        </div>
    )
}