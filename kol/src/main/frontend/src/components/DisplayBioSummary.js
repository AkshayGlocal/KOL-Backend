
import { useEffect,useState } from "react";
export default function DisplayBioSummary(props){
    let data = props.Results;
	let results = [];
	const [ DisplayBioSummary, setDisplayBioSummary ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
                tempobj.bio_summary = e.bio_summary.raw;
				results.push(tempobj);
			});
			setDisplayBioSummary(results);
		},
		[ data ]
	);
	return (
		<div>
			{DisplayBioSummary.map((e, index) => (
				<div style={{marginLeft:"10px"}}>
                    <p>{e.bio_summary}</p>
                </div>
			))}
		</div>
	);
}