import '../css/DisplayTabContent.css';
import { useContext, useEffect,useState } from "react";
import { PressContext } from '../context/PressContext';
export default function DisplayPress(props){
    let data = props.Results;
    let count = props.totalResults;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
        
        () => {
        	data.map((e) => {
				let tempobj = {};
				tempobj.id = e.id_kol.raw;
				tempobj.topic = e.topic.raw;
                tempobj.key_topic = e.key_topic.raw;
                tempobj.url = e.url.raw;
                tempobj.other_topic = e.other_topic.raw;
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
                    <p className='numbering-two'>Topic :{e.topic}</p>
                    <p>KeyTopic :{e.key_topic}</p>
                    <p>URL :{e.url}</p>
                    <p>Other Topics :{e.other_topic}</p> 
                    
                </div>
            ))}
        </div>
    )
}