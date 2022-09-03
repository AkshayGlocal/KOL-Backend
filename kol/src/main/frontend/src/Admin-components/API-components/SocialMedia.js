import { useContext} from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider} from '@elastic/react-search-ui';
import '../../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplaySocialMedia from '../Display-components/DisplaySocialMedia';
import { SocialMediaContext } from '../../context/SocialMediaContext';


const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	engineName: ElasticSearchConstants.ENGINE_NAME_SOCIAL_MEDIA,
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
            social_media_url:{raw:{}},
            social_media_type:{raw:{}},
            date_of_latest_activity:{raw:{}},
            joined_date:{raw:{}},
            user_name:{raw:{}},
            kol_name:{raw:{}},
            radius_reach:{raw:{}},
            social_media:{raw:{}},
			
		},	
	},
	alwaysSearchOnInitialLoad: true
};
export default function SocialMedia(){
    
    const KolIdCtx = useContext(KolIdContext);
	let SocialCtx = useContext(SocialMediaContext);
	configurationOptions.searchQuery.filters[0].values = [KolIdCtx.kol_id];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	
     //configurationOptions.searchQuery.query = KolIdCtx.kol_id;

    return (
		
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, isLoading, totalResults,filters, setSearchTerm, results }) => ({
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
							SocialCtx.setSocialMediaHandler(totalResults);
						}
                        return (
							<div>
        
                                        <div>
                                           <DisplaySocialMedia Results ={results} />
                                        </div>
              
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}