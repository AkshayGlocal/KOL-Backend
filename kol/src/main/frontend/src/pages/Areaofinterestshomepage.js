import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, SearchBox, Facet, ResultsPerPage } from '@elastic/react-search-ui';
import { MultiCheckboxFacet } from '@elastic/react-search-ui-views';
import { Paging } from '@elastic/react-search-ui';
import { PagingInfo } from '@elastic/react-search-ui';
import '../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import logo1 from '../images/glocalLogo1.jpg';
import Logoutbtn from '../components/Logoutbtn';
import { WithSearch } from '@elastic/react-search-ui';
import DisplayKol from '../components/DisplayKol';
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion } from 'react-bootstrap';
import ElasticSearchConstants from '../constants/ElasticSearchConstants';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import '../css/Homepage.css';
import { useContext } from 'react';
import { AreasofInterestsContext } from '../context/AreasOfInterests';
import deleteicon from '../images/delete.png';
import { useNavigate } from 'react-router-dom';
import { DisplayAreaofinterest } from '../components/DisplayAreaofinterest';
import DisplayAreaofinteresthome from '../components/DisplayAreaofinteresthome';
import DisplaySocialActivity from '../Admin-components/Display-components/DisplaySocialActivity';
import clear from '../images/clear.png';
const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	engineName: ElasticSearchConstants.ENGINE_NAME_BIO,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
		//query:'',
        	filters: [
			{
				field: 'areas_of_interests',
				values: []
			}
		],
		disjunctiveFacets: [
			'primary_affiliation',
			'specialty',
			'title',
			'parent_organization',
			'city',
			'state',
			'country'
		],
		disjunctiveFacetsAnalyticsTags: [ 'Ignore' ],
		search_fields: {
			kol_name: {},
			specialty: {},
			areas_of_interests: {},
			gender: {},
			city: {},
			parent_organization: {},
			state: {},
			department: {},
			primary_affiliation: {},
			country: {}
		},

		result_fields: {
			id: { raw: {} },
			kol_name: { raw: {} },
			country: { raw: {} },
			bio_summary: { raw: {} },
			specialty: { raw: {} },
			areas_of_interests: { raw: {} },
			gender: { raw: {} },
			specialty_projection: { raw: {} },
			secondary_address: { raw: {} },
			city: { raw: {} },
			parent_organization: { raw: {} },
			latitude: { raw: {} },
			link: { raw: {} },
			middle_initial: { raw: {} },
			extra_phone_numbers: { raw: {} },
			suffix: { raw: {} },
			title: { raw: {} },
			state: { raw: {} },
			justification: { raw: {} },
			career_status: { raw: {} },
			fax: { raw: {} },
			primary_affiliation: { raw: {} },
			department: { raw: {} },
			first_name: { raw: {} },
			longitude: { raw: {} },
			profession: { raw: {} },
			npi_id: { raw: {} },
			languages: { raw: {} },
			address2: { raw: {} },
			address1: { raw: {} },
			last_name: { raw: {} },
			touchpoints: { raw: {} },
			extra_email_addresses: { raw: {} },
			phone: { raw: {} },
			additional_links: { raw: {} },
			primary_email: { raw: {} },
			salutation: { raw: {} },
			postal_code: { raw: {} }
		},
		facets: {
			primary_affiliation: { type: 'value' },
			specialty: { type: 'value' },
			parent_organization: { type: 'value' },
			title: { type: 'value' },
			state: { type: 'value' },
			city: { type: 'value' },
			country: { type: 'value' }
		}
	},
	autocompleteQuery: {
		results: {
			resultsPerPage: 5,
			result_fields: {
				specialty: { raw: {} },
				areas_of_interests: { raw: {} }
			}
		},
		suggestions: {
			types: {
				documents: { fields: [ 'specialty', 'areas_of_interests' ] }
			},
			size: 4
		}
	},
	trackUrlState:true,
	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true,
};
const ConvertRawDatatoJson = (Results) => {
	let RawtoJsonArray = [];

	Results.map((e) => {
		RawtoJsonArray.push([
			{ id: e.id.raw },
			{ kol_name: e.kol_name.raw },
			{ country: e.country.raw },
			{ bio_summary: e.bio_summary.raw },
			{ specialty: e.specialty.raw },
			{ areas_of_interests: e.areas_of_interests.raw },
			{ gender: e.gender.raw },
			{ specialty_projection: e.specialty_projection.raw },
			{ secondary_address: e.secondary_address.raw },
			{ city: e.city.raw },
			{ parent_organization: e.parent_organization.raw },
			{ latitude: e.latitude.raw },
			{ link: e.link.raw },
			{ middle_initial: e.middle_initial.raw },
			{ extra_phone_numbers: e.extra_phone_numbers.raw },
			{ suffix: e.suffix.raw },
			{ title: e.title.raw },
			{ state: e.state.raw },
			{ justification: e.justification.raw },
			{ career_status: e.career_status.raw },
			{ fax: e.fax.raw },
			{ primary_affiliation: e.primary_affiliation.raw },
			{ department: e.department.raw },
			{ first_name: e.first_name.raw },
			{ longitude: e.longitude.raw },
			{ profession: e.profession.raw },
			{ npi_id: e.npi_id.raw },
			{ languages: e.languages.raw },
			{ address2: e.address2.raw },
			{ address1: e.address1.raw },
			{ last_name: e.last_name.raw },
			{ touchpoints: e.touchpoints.raw },
			{ extra_email_addresses: e.extra_email_addresses.raw },
			{ phone: e.phone.raw },
			{ additional_links: e.additional_links.raw },
			{ salutation: e.salutation.raw },
			{ postal_code: e.postal_code.raw }
		]);
	});
	return RawtoJsonArray;
};

export default function Areaofinterestshomepage() {
	const AreaofInterestCtx = useContext(AreasofInterestsContext);
	const navigate = useNavigate();
    if(AreaofInterestCtx.AreasofInterests !=null && AreaofInterestCtx.AreasofInterests!=='' ){
        configurationOptions.searchQuery.filters[0].values = [ AreaofInterestCtx.AreasofInterests ];
        //configurationOptions.searchQuery.query=AreaofInterestCtx.AreasofInterests;
	 }
	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, isLoading, filters, setSearchTerm, results, totalResults,reset,clearFilters }) => ({
						searchTerm,
						isLoading,
						filters,
						setSearchTerm,
						results,
						totalResults,
						reset,
						clearFilters
						
					})}
				>
					{({ results, filters, searchTerm, setSearchTerm,totalResults,reset ,clearFilters}) => {
					
						let halfLength = Math.ceil(results.length / 2);
						let result1 = results.slice(0, halfLength);
						let result2 = results.slice(halfLength, results.length);
						//let resultdata = ConvertRawDatatoJson(results);
						return (
							<div className="outer-container-mainpage">
								<div className="Search-Box">
									<div className="image-logo">
										<img src={logo1} alt={'GlocalMind'} />
									</div>
									<div className="search">
										<SearchBox
											autocompleteMinimumCharacters={3}
											autocompleteResults={{
												linkTarget: '_blank',
												sectionTitle: 'Results',
												titleField: 'specialty',
												shouldTrackClickThrough: true,
												clickThroughTags: [ 'test' ]
											}}
											autocompleteSuggestions={true}
											debounceLength={0}
											inputProps={{ placeholder: 'Search for KOL Data' }}
											

										/>
									</div>

									<div className="log-btn">
										<Logoutbtn className="Logout-btn" />
									</div>
								</div>
								<div className="resultsInfo">
									<ResultsPerPage />
									{filters.length > 0 ?(
										<div className='clear-filters'>
										
										<button onClick={()=>(clearFilters())}> <div><p>Reset All</p>&nbsp;&nbsp;<img src={clear} /></div></button>
									</div>
									):null }
									<PagingInfo className="paging-info-style" />
									{AreaofInterestCtx.AreasofInterests && 
									<div className='searched-term'>
									<i>{AreaofInterestCtx.AreasofInterests}</i>
										<button onClick={()=>{
											AreaofInterestCtx.setAreasofInterestsHandler(null);
											
											navigate('/admin');
										}}>&nbsp;&nbsp;<img src={deleteicon} alt='delete'/></button>
									</div>
									
									}
									
									{/*<div className="Download-btn">
												 <DownloadAll
													searchTerm={searchTerm}
													connector={connector}
													contextprops={filters}
												/> 
											</div> */}
								</div>
								<div className="filtersAndMainContent">
									<div className="filters">
										<Accordion defaultActiveKey={[ '0' ]} alwaysOpen>
											<Accordion.Item eventKey="0">
												<Accordion.Header>Organization Name</Accordion.Header>
												<Accordion.Body>
													<Facet
														field="primary_affiliation"
														view={MultiCheckboxFacet}
														filterType="any"
													/>
												</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="1">
												<Accordion.Header>Specialty</Accordion.Header>
												<Accordion.Body>
													<Facet
														field="specialty"
														view={MultiCheckboxFacet}
														filterType="any"
													/>
												</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="2">
												<Accordion.Header>Parent Organization</Accordion.Header>
												<Accordion.Body>
													<Facet
														field="parent_organization"
														view={MultiCheckboxFacet}
														filterType="any"
													/>
												</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="3">
												<Accordion.Header>Position Role</Accordion.Header>
												<Accordion.Body>
													<Facet field="title" view={MultiCheckboxFacet} filterType="any" />
												</Accordion.Body>
											</Accordion.Item>

											<Accordion.Item eventKey="4">
												<Accordion.Header>City</Accordion.Header>
												<Accordion.Body>
													<Facet field="city" view={MultiCheckboxFacet} filterType="any" />
												</Accordion.Body>
											</Accordion.Item>

											<Accordion.Item eventKey="6">
												<Accordion.Header>State</Accordion.Header>
												<Accordion.Body>
													<Facet field="state" view={MultiCheckboxFacet} filterType="any" />
												</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="7">
												<Accordion.Header>Country</Accordion.Header>
												<Accordion.Body>
													<Facet field="country" view={MultiCheckboxFacet} filterType="any" />
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
									<div className="main-content">
										<div className="kol-display-content">
											{/* <DisplayKol Results={result1} />
											<DisplayKol Results={result2} /> */}
                                            <DisplayAreaofinteresthome Results ={result1} />
                                            <DisplayAreaofinteresthome Results ={result2} />
                                            
											
										</div>
									</div>
								</div>

								<div className="pagination">
									<Paging />
								</div>
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}
