import '../../css/DisplayTabContent.css';
import { useEffect,useState } from "react";
export default function DisplayTrials(props){
    let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
                tempobj.id=e.id_kol.raw;
                tempobj.phase=e.phase.raw;
                tempobj.intervention_names=e.intervention_names.raw;
                tempobj.trial_id=e.trial_id.raw;
                tempobj.role=e.role.raw;
                tempobj.other_topics=e.other_topics.raw;
                tempobj.trial_region=e.trial_region.raw;
                tempobj.trial_name=e.trial_name.raw;
                tempobj.kol_name=e.kol_name.raw;
                tempobj.trial_end_date=e.trial_end_date.raw;
                tempobj.url=e.url.raw;
                tempobj.bucket=e.bucket.raw;
                tempobj.trial_sponsor=e.trial_sponsor.raw;
                tempobj.trial_type=e.trial_type.raw;
                tempobj.key_topics=e.key_topics.raw;
                tempobj.trial_start_date=e.trial_start_date.raw;
                tempobj.trial_status=e.trial_status.raw;
                tempobj.conditions=e.conditions.raw;
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
                    <p>Phase: {e.phase}</p>
                    <p>Intervention Name : {e.intervention_names}</p>
                    <p>Role : {e.role}</p>
                    <p>Other Topics : {e.other_topics}</p>
                    <p>Trial Region : {e.trial_region}</p>
                    <p>Trial Name : {e.trial_name}</p>
                    <p>URL : {e.url}</p>
                    <p>Bucket : {e.bucket}</p>
                    <p>Trial Sponsor: {e.trial_sponsor}</p>
                    <p>Key Topics: {e.key_topics}</p>
                    <p>Trial Type: {e.trial_type}</p>
                    <p>Trial Start Date: {e.trial_start_date}</p>
                    <p>Trial Status: {e.trial_status}</p>
                    <p>Conditions :{e.conditions}</p>
                </div>
            ))}
        </div>
    )
}