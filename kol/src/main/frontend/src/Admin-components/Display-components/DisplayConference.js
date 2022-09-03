import '../../css/DisplayTabContent.css';
import { useEffect,useState } from "react";
export default function DisplayConference(props){
    let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};    
        
                tempobj.id=e.id_kol.raw;
                tempobj.country=e.country.raw;
                tempobj.abstract_url_other_sources=e.abstract_url_other_sources.raw;
                tempobj.city=e.city.raw;
                tempobj.other_topics=e.other_topics.raw;
                tempobj.link=e.link.raw;
                tempobj.kol_name=e.kol_name.raw;
                tempobj.description=e.description.raw;
                tempobj.type_of_link=e.type_of_link.raw;
                tempobj.abstract_discription=e.abstract_discription.raw;
                tempobj.event_part_date=e.event_part_date.raw;
                tempobj.event_role=e.event_role.raw;
                tempobj.event_type=e.event_type.raw;
                tempobj.link__1=e.link__1.raw;
                tempobj.state=e.state.raw;
                tempobj.sponsor_name=e.sponsor_name.raw;
                tempobj.event_end_date=e.event_end_date.raw;
                tempobj.abstract_yes_no=e.abstract_yes_no.raw;
                tempobj.bucket=e.bucket.raw;
                tempobj.additional_links=e.additional_links.raw;
                tempobj.event_name=e.event_name.raw;
                tempobj.key_topic=e.key_topic.raw;
                tempobj.location=e.location.raw;
                tempobj.event_start_date=e.event_start_date.raw;
                tempobj.description__1=e.description__1.raw;


				results.push(tempobj);
			});
			setdisplayPress(results);
		},
		[data]
	);
    return (
        <div className="diplay-order conference">
            {displayPress.map((e,index)=>(
                <div className='display-tab-content'>
                    <span className="numbering">{index+1} &nbsp;</span> 
                    <p className='numbering-two'>User Name :{e.kol_name}</p>
                    
                    <p>country: {e.country}</p>
                    <p>abstract_url_other_sources: {e.abstract_url_other_sources}</p>
                    <p>city: {e.city}</p>
                    <p>other_topics: {e.other_topics}</p>
                    <p>link: {e.link}</p>
                
                    <p>description: {e.description}</p>
                    <p>type_of_link: {e.type_of_link}</p>
                    <p>abstract_discription: {e.abstract_discription}</p>
                    <p>event_part_date: {e.event_part_date}</p>
                    <p>event_role: {e.event_role}</p>
                    <p>event_type: {e.event_type}</p>
                    <p>link__1: {e.link__1}</p>
                    <p>state: {e.state}</p>
                    <p>sponsor_name: {e.sponsor_name}</p>
                    <p>event_end_date: {e.event_end_date}</p>
                    <p>abstract_yes_no: {e.abstract_yes_no}</p>
                    <p>bucket: {e.bucket}</p>
                    <p>additional_links: {e.additional_links}</p>
                    <p>event_name: {e.event_name}</p>
                    <p>key_topic: {e.key_topic}</p>
                    <p>location: {e.location}</p>
                    <p>event_start_date: {e.event_start_date}</p>
                    <p>description__1 : {e.description__1}</p>

                </div>
            ))}
        </div>
    )
}