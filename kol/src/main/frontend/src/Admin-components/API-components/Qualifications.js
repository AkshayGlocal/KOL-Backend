import { useContext} from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider} from '@elastic/react-search-ui';
import '../../App.css';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplayQualifications from '../Display-components/DisplayQualifications';
import { QualificationsContext } from '../../context/QualificationsContext';
import TabularDataQualifications from '../../pages/TabularDataQualifications';


const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	engineName: ElasticSearchConstants.ENGINE_NAME_QUALIFICATIONS,
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
            end_date:{raw:{}},
            parent_organization:{raw:{}},
            degree:{raw:{}},
            additional_links:{raw:{}},
            kol_name:{raw:{}},
            institution_name:{raw:{}},
            education_type:{raw:{}},
            honors:{raw:{}},
            url:{raw:{}},
            start_date:{raw:{}}

			
		},	
	},
	alwaysSearchOnInitialLoad: true
};
export default function Qualifications(){
    
    const KolIdCtx = useContext(KolIdContext);
	let QualificationCtx = useContext(QualificationsContext);
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
												QualificationCtx.setQualificationsHandler(totalResults);
											}					
                        return (
							<div>
        
                                        <div>
                                           {/* <DisplayQualifications Results ={results} /> */}
										   <TabularDataQualifications Results={results} />
                                        </div>
              
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}