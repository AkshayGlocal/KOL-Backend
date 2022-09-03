//AnalystSpecialtyhome
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
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion } from 'react-bootstrap';
import ElasticSearchConstants from '../constants/ElasticSearchConstants';
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import DisplayAnalyst from '../analyst-components/DisplayAnalyst';
import { SpecialityContext } from '../context/SpecialityContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import deleteicon from '../images/delete.png';
import DisplayAnnalystSpecialtyhome from './DisplayAnalystSpecialtyhome';
const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	engineName: ElasticSearchConstants.ENGINE_NAME_BIO,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
        filters: [
			{
				field: 'specialty',
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
			kol_name:{},
			specialty:{},
			areas_of_interests:{},
			gender:{},
			city:{},
			parent_organization:{},
			state:{},
			department:{},
			primary_affiliation:{},
			country:{}
		},

		result_fields: {
			id: { raw: {} },
			country:{raw:{}},
			specialty:{raw:{}},
			parent_organization:{raw:{}},
			primary_affiliation:{raw:{}},
			areas_of_interests: { raw: {} },
		},
		facets: {
			primary_affiliation: { type: 'value' },
			specialty: { type: 'value' },
			parent_organization: { type: 'value' },
			title: { type: 'value' },
			state: { type: 'value' },
			city: { type: 'value' },
			country: { type: 'value' },
			
			
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

	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true
};

export default function AnalystSpecialtyhome() {
    const SpecialtyCtx = useContext(SpecialityContext);
	const navigate = useNavigate();
    if(SpecialtyCtx.Speciality !=null && SpecialtyCtx.Speciality!=='' ){
        configurationOptions.searchQuery.filters[0].values = [ SpecialtyCtx.Speciality ];
        //configurationOptions.searchQuery.query=AreaofInterestCtx.AreasofInterests;
	 }
	return (
		
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch 
					mapContextToProps={({ searchTerm, isLoading, filters, setSearchTerm, results ,totalResults}) => ({
						searchTerm,
						isLoading,
						filters,
						setSearchTerm,
						results,
						totalResults

					})}
				>
					{({ results, filters, searchTerm ,totalResults}) => {
						//let resultdata = ConvertRawDatatoJson(results);
						let halfLength = Math.ceil(results.length / 2);
						let result1 = results.slice(0, halfLength);
						let result2 = results.slice(halfLength, results.length);
						
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
									<PagingInfo className="paging-info-style" />
                                    {SpecialtyCtx.Speciality && 
									<div className='searched-term'>
									<i>{SpecialtyCtx.Speciality}</i>
										<button onClick={()=>{
											SpecialtyCtx.setSpecialityHandler(null);
											navigate('/analyst');
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
	
											{/* <DisplayAnalyst Results={result1} />
											<DisplayAnalyst Results={result2} /> */}
                                            <DisplayAnnalystSpecialtyhome Results={result1} />
                                            <DisplayAnnalystSpecialtyhome Results={result2} />

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
