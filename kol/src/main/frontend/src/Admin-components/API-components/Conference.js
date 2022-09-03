import { useContext } from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider } from '@elastic/react-search-ui';
import '../../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplayConference from '../Display-components/DisplayConference';
import { ConferenceContext } from '../../context/ConferenceContext';
import TabularDataQualifications from '../../pages/TabularDataQualifications';
import TabularDataConference from '../../pages/TabularDataConference';

const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	engineName: ElasticSearchConstants.ENGINE_NAME_CONFERENECE,
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
		// query: "",
		filters: [
			{
				field: 'id_kol',
				values: []
			}
		],
		resultsPerPage: 0,
		result_fields: {
			id_kol: { raw: {} },
			country: { raw: {} },
			abstract_url_other_sources: { raw: {} },
			city: { raw: {} },
			other_topics: { raw: {} },
			link: { raw: {} },
			kol_name: { raw: {} },
			description: { raw: {} },
			type_of_link: { raw: {} },
			abstract_discription: { raw: {} },
			event_part_date: { raw: {} },
			event_role: { raw: {} },
			event_type: { raw: {} },
			link__1: { raw: {} },
			state: { raw: {} },
			sponsor_name: { raw: {} },
			event_end_date: { raw: {} },
			abstract_yes_no: { raw: {} },
			bucket: { raw: {} },
			additional_links: { raw: {} },
			event_name: { raw: {} },
			key_topic: { raw: {} },
			location: { raw: {} },
			event_start_date: { raw: {} },
			description__1: { raw: {} }
		}
	},
	alwaysSearchOnInitialLoad: true
};
export default function Conference() {
	const KolIdCtx = useContext(KolIdContext);
	configurationOptions.searchQuery.filters[0].values = [ KolIdCtx.kol_id ];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	let ConferenceCtx = useContext(ConferenceContext);

	//configurationOptions.searchQuery.query = KolIdCtx.kol_id;

	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, totalResults, isLoading, filters, setSearchTerm, results }) => ({
						searchTerm,
						isLoading,
						filters,
						setSearchTerm,
						results,
						totalResults
					})}
				>
					{({ results, filters, searchTerm, totalResults }) => {
						if (totalResults > 0) {
							ConferenceCtx.setConferenceHandler(totalResults);
						}
						return (
							<div>
								<div>
									{/* <DisplayConference Results ={results} /> */}
									<TabularDataConference Results={results} />
								</div>
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}
