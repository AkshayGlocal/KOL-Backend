import '../../css/DisplayTabContent.css';
import { useEffect,useState } from "react";
export default function DisplaySocialMedia(props){
    let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
                
                tempobj.id=e.id_kol.raw;
                tempobj.social_media_url=e.social_media_url.raw;
                tempobj.social_media_type=e.social_media_type.raw;
                tempobj.date_of_latest_activity=e.date_of_latest_activity.raw;
                tempobj.joined_date=e.joined_date.raw;
                tempobj.user_name=e.user_name.raw;
                tempobj.kol_name=e.kol_name.raw;
                tempobj.radius_reach=e.radius_reach.raw;
                tempobj.social_media=e.social_media.raw;

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
                    <p>Social Media:{e.social_media}</p>
                    <p>Social Media Type :{e.social_media_type}</p>
                    <p>Date of Latest Activity :{e.date_of_latest_activity}</p>
                    <p>Joined Date :{e.joined_date}</p>
                    <p>Radius Reach :{e.radius_reach}</p>
                    <p>URL : {e.social_media_url}</p>
                </div>
            ))}
        </div>
    )
}