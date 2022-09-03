import { useContext } from 'react';
import { KolIdContext } from '../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider } from '@elastic/react-search-ui';
import '../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import DisplayProfessionalActivities from '../components/DisplayProfessionalActivities';
import ElasticSearchConstants from '../constants/ElasticSearchConstants';
import { ProfessionalContext } from '../context/ProfessionalContext';
import TabularDataprofession from './TabularDataprofession';

const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	engineName: ElasticSearchConstants.ENGINE_NAME_PROFESSIONAL_ACTIVITIES,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
		filters: [
			{
				field: 'id_kol',
				values: []
			}
		],
		resultsPerPage: 0,
		result_fields: {
			id_kol: { raw: {} },
			id: { raw: {} },
			parent_organization: { raw: {} },
			position_role: { raw: {} },
			organization_name: { raw: {} },
			parent_organization_type: { raw: {} },
			affiliation_type: { raw: {} },
			links: { raw: {} },
			end_date: { raw: {} },
			city: { raw: {} },
			country: { raw: {} }
		}
	},

	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true
};
export default function ProfessionalActivities() {
	const KolIdCtx = useContext(KolIdContext);
	configurationOptions.searchQuery.filters[0].values = [ KolIdCtx.kol_id ];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	let professionalCtx = useContext(ProfessionalContext);
	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, isLoading, filters, setSearchTerm, results, totalResults }) => ({
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
							professionalCtx.setProfessionalHandler(totalResults);
						}
						return (
							<div>
								<div>
									{/* <DisplayProfessionalActivities Results={results} /> */}
									<TabularDataprofession Results={results} />
								</div>
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}
