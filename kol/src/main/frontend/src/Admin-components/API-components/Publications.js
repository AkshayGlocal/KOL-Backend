import { useContext} from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider} from '@elastic/react-search-ui';
import '../../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplayPublications from '../Display-components/DisplayPublications';
import { PublicationsContext } from '../../context/Publications';


const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	engineName: ElasticSearchConstants.ENGINE_NAME_PUBLICATIONS,
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
            article_chapter_title:{raw:{}},
            other_topics:{raw:{}},
            kol_name:{raw:{}},
            abstract:{raw:{}},
            author_list:{raw:{}},
            co_authors:{raw:{}},
            publication_type:{raw:{}},
            journal_book_title:{raw:{}},
            url:{raw:{}},
            publication_id:{raw:{}},
            bucket:{raw:{}},
            mesh_term:{raw:{}},
            publication_year:{raw:{}},
            authorship_role:{raw:{}},
            key_topics:{raw:{}},
            author_position:{raw:{}}


			
		},	
	},
	alwaysSearchOnInitialLoad: true
};
export default function Publications(){
    
    const KolIdCtx = useContext(KolIdContext);
    const PublicationCtx = useContext(PublicationsContext);
	configurationOptions.searchQuery.filters[0].values = [KolIdCtx.kol_id];
	configurationOptions.searchQuery.resultsPerPage = ElasticSearchConstants.RESULTS_TOTAL;
	
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
                                                PublicationCtx.setPublicationsHandler(totalResults);
                                            }
                        
                        return (
							<div>
        
                                        <div>
                                           <DisplayPublications Results ={results} />
                                        </div>
              
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}