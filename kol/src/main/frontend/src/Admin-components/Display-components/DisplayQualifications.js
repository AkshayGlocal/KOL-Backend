import '../../css/DisplayTabContent.css';
import { useEffect,useState } from "react";
export default function DisplayQualifications(props){
    let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
                tempobj.id=e.id_kol.raw;
                tempobj.end_date=e.end_date.raw;
                tempobj.parent_organization=e.parent_organization.raw;
                tempobj.degree=e.degree.raw;
                tempobj.additional_links=e.additional_links.raw;
                tempobj.kol_name=e.kol_name.raw;
                tempobj.institution_name=e.institution_name.raw;
                tempobj.education_type=e.education_type.raw;
                tempobj.honors=e.honors.raw;
                tempobj.url=e.url.raw;
                tempobj.start_date=e.start_date.raw;

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
                    <p className='numbering-two'>User Name :{e.kol_name}</p>
                    <p>Parent Organization :{e.parent_organization} </p>
                    <p>Degree :{e.parent_organization} </p>
                    <p>Additional Links : {e.additional_links}</p>
                    <p>Institution Name : {e.institution_name}</p>
                    <p>Education Type : {e.education_type}</p>
                    <p>Honors : {e.honors}</p>
                    <p>URL : {e.url}</p>
                    <p>Start Date : {e.start_date}</p>
                </div>
            ))}
        </div>
    )
}