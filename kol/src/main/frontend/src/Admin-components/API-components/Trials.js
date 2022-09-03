import { useContext} from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider} from '@elastic/react-search-ui';
import '../../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplayTrials from '../Display-components/DisplayTrials';
import { TrailsContext } from '../../context/TrialsContext';


const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	engineName: ElasticSearchConstants.ENGINE_NAME_TRIALS,
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
            phase:{raw:{}},
            intervention_names:{raw:{}},
            trial_id:{raw:{}},
            role:{raw:{}},
            other_topics:{raw:{}},
            trial_region:{raw:{}},
            trial_name:{raw:{}},
            kol_name:{raw:{}},
            trial_end_date:{raw:{}},
            url:{raw:{}},
            bucket:{raw:{}},
            trial_sponsor:{raw:{}},
            trial_type:{raw:{}},
            key_topics:{raw:{}},
            trial_start_date:{raw:{}},
            trial_status:{raw:{}},
            conditions:{raw:{}}

		},	
	},
	alwaysSearchOnInitialLoad: true
};
export default function Trials(){
    
    const KolIdCtx = useContext(KolIdContext);
	configurationOptions.searchQuery.filters[0].values = [KolIdCtx.kol_id];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	let trialsCtx = useContext(TrailsContext);
     //configurationOptions.searchQuery.query = KolIdCtx.kol_id;

    return (
		
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, totalResults,isLoading, filters, setSearchTerm, results }) => ({
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
                                                trialsCtx.setTrailsHandler(totalResults);
                                            }
                        
                        return (
							<div>
        
                                        <div>
                                           <DisplayTrials Results ={results} />
                                        </div>
              
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}