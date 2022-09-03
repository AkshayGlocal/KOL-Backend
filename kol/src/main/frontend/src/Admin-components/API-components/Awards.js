import { useContext} from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider} from '@elastic/react-search-ui';
import '../../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplayAwards from '../Display-components/DisplayAwards';


const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	engineName: ElasticSearchConstants.ENGINE_NAME_AWARDS,
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
            awarding_body_name:{raw:{}},
            year:{raw:{}},
            kol_name:{raw:{}},
            honour_award_name:{raw:{}},
            url:{raw:{}}

			
		},	
	},
	alwaysSearchOnInitialLoad: true
};
export default function Awards(){
    
    const KolIdCtx = useContext(KolIdContext);
	configurationOptions.searchQuery.filters[0].values = [KolIdCtx.kol_id];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	
     //configurationOptions.searchQuery.query = KolIdCtx.kol_id;

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
					{({ results, filters, searchTerm }) => {
						
                        return (
							<div>
        
                                        <div>
                                           <DisplayAwards Results ={results} />
                                        </div>
              
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}