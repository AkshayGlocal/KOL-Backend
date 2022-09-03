import { useContext } from 'react';
import { KolIdContext } from '../../context/KolIdContext';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider } from '@elastic/react-search-ui';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { WithSearch } from '@elastic/react-search-ui';
import 'bootstrap/dist/css/bootstrap.css';
import ElasticSearchConstants from '../../constants/ElasticSearchConstants';
import DisplayPhoneAddress from '../../components/DisplayPhoneAddress';

const connector = new AppSearchAPIConnector({
	searchKey: ElasticSearchConstants.SEARCH_KEY,
	engineName: ElasticSearchConstants.ENGINE_NAME_BIO,
	endpointBase: ElasticSearchConstants.ENDPOINT_BASE,
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
		query: '',
		result_fields: {
			id: { raw: {} },
			kol_name: { raw: {} },
			phone: { raw: {} },
			fax:{raw:{}},
			extra_phone_numbers:{raw:{}},
			primary_email:{raw:{}},
			extra_email_addresses:{raw:{}},
			suffix: { raw: {} },
			address1: { raw: {} },
			address2: { raw: {} },
			city:{raw:{}},
			state:{raw:{}},
			country: { raw: {} },
			postal_code:{raw:{}},
			region:{raw:{}},
			bio_summary: { raw: {} },
			specialty: { raw: {} },
			areas_of_interests: { raw: {} },
			gender: { raw: {} }
		}
	},
    hasA11yNotifications: true,
	
	alwaysSearchOnInitialLoad: true
};

export default function PhoneAddress(){
    const KolIdCtx = useContext(KolIdContext);
    configurationOptions.searchQuery.query = KolIdCtx.kol_id;
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
					{({ results, filters, searchTerm,isLoading }) => {
						return (
							<div>
								<DisplayPhoneAddress  Results={results}/>
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}