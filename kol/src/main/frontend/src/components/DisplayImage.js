import female_icon from '../images/female.png';
import { useEffect, useState } from 'react';
import '../css/DisplayImage.css';
import male_icon from '../images/male.jpeg';

export function DisplayImage(props) {
	let data = props.Results;
	let gender = props.Gender;
	let results = [];
	const [ displayImage, setdisplayImage ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.id = e.id.raw;
				tempobj.image_link = e.image_link.raw;
				tempobj.kol_name = e.kol_name.raw;
				tempobj.id_kol = e.id_kol.raw;
				tempobj.source_link = e.source_link.raw;
				results.push(tempobj);
			});
			setdisplayImage(results);
		},
		[ data ]
	);
	return (
		<div>
			{gender==='Male' ?(
				displayImage.map((e, index) => (
					<div className="image-cont">
						
						<img className="image" src={e.image_link} alt={'doctor'}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src="/static/media/male.d957a1f16df69f97c315.jpeg";
						}}
						/>
					</div>
				))
				):(
					displayImage.map((e, index) => (
						<div className="image-cont">
						
						<img className="image" src={e.image_link} alt={'doctor'}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src="/static/media/female.2b4a115f6a28c2308b61.png";
						}}
						/>
					</div>
				))
			)}
			
		</div>
	);
}
