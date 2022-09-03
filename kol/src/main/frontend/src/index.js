import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  { LoginContextProvider} from './context/LoginContext';
import { KolIdProvider } from './context/KolIdContext';
import { PressProvider } from './context/PressContext';
import { ProfessionalProvider } from './context/ProfessionalContext';
import { SocialMediaProvider } from './context/SocialMediaContext';
import { QualificationsProvider } from './context/QualificationsContext';
import { SocialActivityProvider } from './context/SocialActivityContext';
import { TrailsProvider } from './context/TrialsContext';
import { PublicationsProvider } from './context/Publications';
import { ConferenceProvider } from './context/ConferenceContext';
import { AreasofInterestsProvider } from './context/AreasOfInterests';
import { SpecialityProvider } from './context/SpecialityContext';
import { GenderProvider } from './context/GenderContext';
import { AuthContextProvider } from './context/AuthContext';
import { NotificationProvider } from './context/Notification';



ReactDOM.render(
	<React.StrictMode>

		 <LoginContextProvider>

			<NotificationProvider>
			<AuthContextProvider>
			<KolIdProvider>
			<PressProvider>
			<ProfessionalProvider>
			<SocialMediaProvider>
			<QualificationsProvider>
			<SocialActivityProvider>
			<TrailsProvider>
			<PublicationsProvider>
			<ConferenceProvider>
			<AreasofInterestsProvider>
			<SpecialityProvider>
			<GenderProvider>

				<App />		

			</GenderProvider>

			</SpecialityProvider>
			</AreasofInterestsProvider>
			</ConferenceProvider>
			</PublicationsProvider>

			</TrailsProvider>
			</SocialActivityProvider>
			</QualificationsProvider>
			</SocialMediaProvider>
			</ProfessionalProvider>

			</PressProvider>
			</KolIdProvider>
			</AuthContextProvider>
			</NotificationProvider>

		 </LoginContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
