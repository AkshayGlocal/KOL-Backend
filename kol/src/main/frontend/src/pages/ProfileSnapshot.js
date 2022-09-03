import { useContext } from 'react';
import { KolIdContext } from '../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider } from '@elastic/react-search-ui';
import '../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import Press from './Press';
import ProfessionalActivities from './ProfessionalActivities';
import ElasticSearchConstants from '../constants/ElasticSearchConstants';
import '../css/ProfileSnapshot.css';
import DisplayNameContent from '../components/DisplayNameContent';
import { Tabs,Tab } from 'react-bootstrap';
import DisplayBioSummary from '../components/DisplayBioSummary';
import biosummary from '../images/bio-summary.png';
import { useNavigate } from 'react-router-dom';
import SocialMedia from '../Admin-components/API-components/SocialMedia';
import Qualifications from '../Admin-components/API-components/Qualifications';
import { PressContext } from '../context/PressContext';
import SocialActivity from '../Admin-components/API-components/SocialActivity';
import Trials from '../Admin-components/API-components/Trials';
import Publications from '../Admin-components/API-components/Publications';
import Conference from '../Admin-components/API-components/Conference';
import { ProfessionalContext } from '../context/ProfessionalContext';
import { SocialMediaContext } from '../context/SocialMediaContext';
import { QualificationsContext } from '../context/QualificationsContext';
import { SocialActivityContext } from '../context/SocialActivityContext';
import { TrailsContext } from '../context/TrialsContext';
import { PublicationsContext } from '../context/Publications';
import { ConferenceContext } from '../context/ConferenceContext';
import Awards from '../Admin-components/API-components/Awards';
import PieRechartComponent from '../Admin-components/Display-components/DisplayPieCharts';
import LoadingData from './LoadingData';
import ExampleChart from './ExampleChart';
import SpinnerProfile from '../components/SpinnerProfile';

const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	engineName: ElasticSearchConstants.ENGINE_NAME_BIO,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
		query: '',
		result_fields: {
			id: { raw: {} },
			salutation:{raw:{}},
			kol_name: { raw: {} },
			phone: { raw: {} },
			address1: { raw: {} },
			address2: { raw: {} },
			suffix: { raw: {} },
			country: { raw: {} },
			bio_summary: { raw: {} },
			specialty: { raw: {} },
			areas_of_interests: { raw: {} },
			gender: { raw: {} },
			npi_id:{raw:{}},
			languages:{raw:{}}
		}
	},

	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true
};
const ConvertRawDatatoJson = (Results) => {
	let RawtoJsonArray = [];

	Results.map((e) => {
		RawtoJsonArray.push([
			{ id: e.id.raw },
			{ phone: e.phone.raw },
			{ address1: e.address1.raw },
			{ address2: e.address2.raw },
			{ suffix: e.suffix.raw },
			{ kol_name: e.kol_name.raw },
			{ country: e.country.raw },
			{ bio_summary: e.bio_summary.raw },
			{ specialty: e.specialty.raw },
			{ areas_of_interests: e.areas_of_interests.raw },
			{ gender: e.gender.raw }
		]);
	});
	return RawtoJsonArray;
};

export default function ProfileSnapshot() {
	const PressCtx= useContext(PressContext);
	const ProfessionalCtx = useContext(ProfessionalContext);
	const SocailCtx = useContext(SocialMediaContext);
	const QualificationCtx = useContext(QualificationsContext);
	const SocialActivityCtx = useContext(SocialActivityContext);
	const TrialsCtx = useContext(TrailsContext);
	const PublicationsCtx = useContext(PublicationsContext);
	const ConferenceCtx = useContext(ConferenceContext);
	const stylesP ={
		color:'red',
		marginLeft:"10px"
	}
	const navigate = useNavigate();
	const KolIdCtx = useContext(KolIdContext);
	configurationOptions.searchQuery.query = KolIdCtx.kol_id;
	const styles ={
		position: "absolute",
		top: "50%",
		left: "50%",
		textAlign:"center",
	
	  }
	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, isLoading, filters, setSearchTerm, results }) => ({
						searchTerm,
						isLoading,
						filters,
						setSearchTerm,
						results
					})}
				>
					{({ results, filters, searchTerm,isLoading }) => {
						//	let resultdata = ConvertRawDatatoJson(results);
						return (
							<>
							{isLoading
								?(<div style={styles}>
									<SpinnerProfile />
								</div>)
								:null
							}
							
							<div className="outer-container">
							
								{/* <DisplayPhoneAddress  Results={results}/> */}
								<div className="InnerDetails-container">
									<div className='Name-profile-count-data'>
										<div className='name-display' >
											<DisplayNameContent Results={results} />

										</div>
										<div className='Profile-count-data'>
										{/* <PieRechartComponent  press = {PressCtx}
										professional ={ProfessionalCtx}
										social={SocailCtx}
										qualification={QualificationCtx}
										socialactivity={SocialActivityCtx}
										trails={TrialsCtx}
										publications={PublicationsCtx}
										conference={ConferenceCtx}
										/> */}
										{/* <LoadingData press={PressCtx} */}
										{/* <LoadingData press={PressCtx.press} 
										professional = {ProfessionalCtx.professional}
										social = {SocailCtx.SocialMedia}
										qualification = {QualificationCtx.Qualifications}
										trails = {TrialsCtx.Trails}
										publications = {PublicationsCtx.Publications}
										conference = {ConferenceCtx.Conference}
										SocialActivity = {SocialActivityCtx.SocialActivity}
										/> */}
										{ <ExampleChart press={PressCtx.press} 
										professional = {ProfessionalCtx.professional}
										social = {SocailCtx.SocialMedia}
										qualifications = {QualificationCtx.Qualifications}
										socialactivity = {SocialActivityCtx.SocialActivity}
										trials={TrialsCtx.Trails}
										publications={PublicationsCtx.Publications}
										conference={ConferenceCtx.Conference}
										
										
										/> }
										{/* <p>Press {PressCtx.press} </p>
											<p>Professional {ProfessionalCtx.professional}</p>
											<p>Social Media {SocailCtx.SocialMedia}</p>
											<p>Qualifications {QualificationCtx.Qualifications}</p>
											<p>Social Activity {SocialActivityCtx.SocialActivity}</p>
											<p>Trials {TrialsCtx.Trails}</p>
											<p>Publications {PublicationsCtx.Publications}</p>
											<p>Conference {ConferenceCtx.Conference}</p> */}
										</div>
									</div>
									<br />
									<Tabs defaultActiveKey="biography" id="uncontrolled-tab-example" className="mb-3">
										<Tab eventKey="biography" title="Main Info">
											<span>
											<img style={{marginLeft:"5px"}}src={biosummary} />
											<p className='bio-title'>Bio Summary</p>
											</span>
												
											<DisplayBioSummary Results={results} />
										</Tab>
										<Tab eventKey="press" title="Press">
											<Press  />
										</Tab>
										<Tab eventKey="professional activities" title="Profession" >
											<ProfessionalActivities />
										
										</Tab>
										{ <Tab eventKey="qualifications" title="Qualifications">
											<Qualifications />
										</Tab> }
										<Tab eventKey="conference" title="Conference">
											<Conference />
										</Tab>
										<Tab eventKey="social media" title="Social Media">
											<SocialMedia />
										</Tab>

										
										{/* { <Tab eventKey="awards" title="Awards">
											<Awards />
										</Tab> } */}
										<Tab eventKey="social activity" title="Social Activity">
											<SocialActivity />
										</Tab>
										<Tab eventKey="trials" title="Trials">
											<Trials />
										</Tab>
										<Tab eventKey="publications" title="Publications">
											<Publications />
										</Tab>

										<Tab eventKey="awards" title="Awards">
											<Awards />
										</Tab>
										
										<Tab eventKey="Company Affinity" title="Company Affinity">
											<p>Coming Soon..</p>
										</Tab>
									
										</Tabs>
										
								</div>

							
								
								
							</div>
							</>
							
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}
