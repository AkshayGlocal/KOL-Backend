import '../../css/DisplayTabContent.css';
import { useEffect,useState } from "react";
export default function DisplaySocialActivity(props){
    let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
                
                tempobj.kol_name = e.kol_name.raw;
                tempobj.id_kol = e.id_kol.raw;
                tempobj.social_media_article = e.social_media_article.raw;
                tempobj.bucket = e.bucket.raw;
                tempobj.social_media_urls = e.social_media_urls.raw;
                tempobj.key_topic = e.key_topic.raw;
                tempobj.social_media_article_urls = e.social_media_article_urls.raw;
                tempobj.number_of_views_comments = e.number_of_views_comments.raw;
                tempobj.publish_date = e.publish_date.raw;
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
                    <p className='numbering-two'>User Name :{e.kol_name}</p>
                    <p>Social Media Article: {e.social_media_article}</p>
                    <p>Bucket : {e.bucket}</p>
                    <p>Social Media URLS : {e.social_media_urls}</p>
                    <p>Key Topic : {e.key_topic}</p>
                    <p>Social Media Article URL's : {e.social_media_article_urls}</p>
                    <p>Number of views comments : {e.number_of_views_comments}</p>
                    <p>Publish Date : {e.publish_date}</p>
                    <p>Other Topics : {e.other_topic}</p>
                </div>
            ))}
        </div>
    )
}