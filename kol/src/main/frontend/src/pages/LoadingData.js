export default function LoadingData(props){
    let press = props.press;
    let professional = props.professional;
    let social = props.social;
    let qualification = props.qualification;
    let trails = props.trails;
    let publications = props.publications;
    let conference = props.conference;
    let SocialActivity = props.SocialActivity;
    return (
        <div>
            <h4>{press}</h4>
            <h4>{professional}</h4>
            <h4>{social}</h4>
            <h4>{qualification}</h4>
            <h4>{trails}</h4>
            <h4>{publications}</h4>
            <h4>{conference}</h4>
            <h4>{SocialActivity}</h4>
        </div>
    )
}