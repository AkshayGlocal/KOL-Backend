import { useContext} from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider} from '@elastic/react-search-ui';
import '../../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplaySocialActivity from '../Display-components/DisplaySocialActivity';
import { SocialActivityContext } from '../../context/SocialActivityContext';


const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	engineName: ElasticSearchConstants.ENGINE_NAME_SOCIAL_ACTIVITY,
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
            social_media_article:{raw:{}},
            bucket:{raw:{}},
            social_media_urls:{raw:{}},
            kol_name:{raw:{}},
            key_topic:{raw:{}},
            social_media_article_urls:{raw:{}},
            number_of_views_comments:{raw:{}},
            publish_date:{raw:{}},
            other_topic:{raw:{}}

			
		},	
	},
	alwaysSearchOnInitialLoad: true
};
export default function SocialActivity(){
    
    const KolIdCtx = useContext(KolIdContext);
    let SocialCtx = useContext(SocialActivityContext);
	configurationOptions.searchQuery.filters[0].values = [KolIdCtx.kol_id];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	
     //configurationOptions.searchQuery.query = KolIdCtx.kol_id;

    return (
		
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, isLoading, filters, setSearchTerm, results 
                    ,totalResults}) => ({
						searchTerm,
						isLoading,
						filters,
						setSearchTerm,
						results,
                        totalResults
					})}
				>
					{({ results, filters, totalResults,searchTerm }) => {
											if(totalResults > 0){
                                                SocialCtx.setSocialActivityHandler(totalResults);
                                            }
                        
                        return (
							<div>
        
                                        <div>
                                           <DisplaySocialActivity Results ={results} />
                                        </div>
              
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}