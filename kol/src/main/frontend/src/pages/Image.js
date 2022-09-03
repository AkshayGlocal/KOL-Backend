import { useContext } from 'react';
import { KolIdContext } from '../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider } from '@elastic/react-search-ui';
import '../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../constants/ElasticSearchConstants';
import { DisplayImage } from '../components/DisplayImage';
import SpinnerProfile from '../components/SpinnerProfile';
import { GenderContext } from '../context/GenderContext';

const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	engineName: ElasticSearchConstants.ENGINE_NAME_IMAGE,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	cacheResponses: true
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
			id: { raw: {} },
			image_link: { raw: {} },
			kol_name: { raw: {} },
			source_link: { raw: {} }
		}
	},

	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true
};
export function ImageLoading() {
	const KolIdCtx = useContext(KolIdContext);
	const GenderCtx = useContext(GenderContext);
	configurationOptions.searchQuery.filters[0].values = [ KolIdCtx.kol_id ];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	const stylesSpinner = {
		width: '700px',
		position: 'absolute'
	};
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
					{({ results, filters, searchTerm, isLoading }) => {
						return (
							<div>
								{isLoading ? (
									<div style={stylesSpinner}>
										<SpinnerProfile />
									</div>
								) : null}

								<DisplayImage Results={results} Gender={GenderCtx.gender} />
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}
