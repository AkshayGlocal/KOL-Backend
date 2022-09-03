import '../../css/DisplayTabContent.css';
import { useEffect, useState } from 'react';
export default function DisplayAwards(props) {
	let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			
			data.map((e) => {
				let tempobj = {};

				tempobj.id = e.id_kol.raw;
			    tempobj.awarding_body_name=e.awarding_body_name.raw;
				tempobj.year = e.year.raw;
				tempobj.kol_name = e.kol_name.raw;
				tempobj.honour_award_name = e.honour_award_name.raw;
				tempobj.url = e.url.raw;

				results.push(tempobj);
			});
			setdisplayPress(results);
		},
		[ data ]
	);
	return (
		<div className="diplay-order">
			{displayPress.map((e, index) => (
				<div className="display-tab-content">
					<span className="numbering">{index + 1} &nbsp;</span>
					<p className="numbering-two">User Name :{e.kol_name}</p>
					 <p>Awarding Body Name : {e.awarding_body_name}</p> 
					<p>Year : {e.year}</p>
					<p>Honor Award Name : {e.honour_award_name}</p>
					<p>URL : {e.url}</p>
				</div>
			))}
		</div>
	);
}
