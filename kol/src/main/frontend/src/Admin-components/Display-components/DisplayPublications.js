import '../../css/DisplayTabContent.css';
import { useEffect,useState } from "react";
export default function DisplayPublications(props){
    let data = props.Results;
	let results = [];
	const [ displayPress, setdisplayPress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
                
               
                tempobj.id=e.id_kol.raw;
                tempobj.article_chapter_title=e.article_chapter_title.raw;
                tempobj.other_topics=e.other_topics.raw;
                tempobj.kol_name=e.kol_name.raw;
                tempobj.abstract=e.abstract.raw;
                tempobj.author_list=e.author_list.raw;
                tempobj.co_authors=e.co_authors.raw;
                tempobj.publication_type=e.publication_type.raw;
                tempobj.journal_book_title=e.journal_book_title.raw;
                tempobj.url=e.url.raw;
                tempobj.publication_id=e.publication_id.raw;
                tempobj.bucket=e.bucket.raw;
                tempobj.mesh_term=e.mesh_term.raw;
                tempobj.publication_year=e.publication_year.raw;
                tempobj.authorship_role=e.authorship_role.raw;
                tempobj.key_topics=e.key_topics.raw;
                tempobj.author_position=e.author_position.raw;

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
                    <p>Article Chapter title: {e.article_chapter_title}</p>
                    <p>Other Topics : {e.other_topics}</p>
                    <p>abstract : {e.abstract}</p>
                    <p>Author List : {e.author_list}</p>
                    <p>Co Authors :{e.co_authors} </p>
                    <p>Publication Type : {e.publication_type}</p>
                    <p>Journal Book Title : {e.journal_book_title}</p>
                    <p>URL : {e.url}</p>
                    <p>bucket : {e.bucket}</p>
                    <p>Mesh Term :{e.mesh_term}</p>
                    <p>Publication year : {e.publication_year}</p>
                    <p>Authorship Role: {e.authorship_role}</p>
                    <p>Key Topics : {e.key_topics}</p>
                    <p>Author Positions : {e.author_position}</p>

                </div>
            ))}
        </div>
    )
}