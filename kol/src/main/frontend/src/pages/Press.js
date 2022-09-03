import { useContext} from 'react';
import { KolIdContext } from '../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider} from '@elastic/react-search-ui';
import '../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import DisplayPress from '../components/DisplayPress';
import ElasticSearchConstants from '../constants/ElasticSearchConstants';
import { PressContext } from '../context/PressContext';
import TabularData from './TabularData';



const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	engineName: ElasticSearchConstants.ENGINE_NAME_PRESS,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
		// query: "",
		filters: [{
			field: "id_kol", values: [],
		  }],
		  resultsPerPage: 0,
		result_fields: {
			id_kol:{raw:{}},
			id: { raw: {} },
			date:{raw:{}},
			bucket:{raw:{}},
			press_text:{raw:{}},
			topic:{raw:{}},
			scientific_platform:{raw:{}},
			key_topic:{raw:{}},
			url:{raw:{}},
			other_topic:{raw:{}}
		},	
	},

	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true
};
export default function Press(){
    
    const KolIdCtx = useContext(KolIdContext);
	configurationOptions.searchQuery.filters[0].values = [KolIdCtx.kol_id];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	let pressCtx = useContext(PressContext);
     //configurationOptions.searchQuery.query = KolIdCtx.kol_id;

    return (
		
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, isLoading, filters, setSearchTerm, results,totalResults }) => ({
						searchTerm,
						isLoading,
						filters,
						setSearchTerm,
						results,
						totalResults
					})}
				>
					{({ results, filters, searchTerm,totalResults }) => {
		
						if(totalResults > 0){
							pressCtx.setPressHandler(totalResults);
						}
					
                        return (
							<div>
                                        <div>
                                           {/* <DisplayPress Results ={results} totalResults={totalResults} /> */}
										   <TabularData Results = {results} />
                                        </div>
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}