import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AnalystPage from './pages/AnalystPage';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserRoleContext } from './context/LoginContext';
import ProfileSnapshot from './pages/ProfileSnapshot';
import ProfileLayout from './pages/Profilelayout';
import AreaofInterests from './pages/AreaofInterests';
import Areaofinterestshomepage from './pages/Areaofinterestshomepage';
import Specialtyhomepage from './pages/Specialtyhomepage';
import Specialty from './pages/Specialty';
import ExampleChart from './pages/ExampleChart';
import DisplayAnalystAreaofInteresthome from './analyst-components/AnalystAreaofinteresthome';
import DisplayAnalystSpecialtyhome from './analyst-components/AnalystSpecialtyhome';
import AnalystAreaofinteresthome from './analyst-components/AnalystAreaofinteresthome';
import AnalystSpecialtyhome from './analyst-components/AnalystSpecialtyhome';
import AnalystAreaofinterest from './analyst-components/AnalystAreaofinterest';
import AnalystSpecialty from './analyst-components/AnalystSpecialty';
import TabularData from './pages/TabularData';
import ProfileRequested from './pages/ProfileRequested';

export default function App() {
	const LoginUserCtx = useContext(UserRoleContext);
	const userNameCtx = LoginUserCtx.username;
	const elementprofilepage =()=>{
		return userNameCtx ==='analyst' ? <AnalystPage/> : <AdminPage/>;
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/admin"
					element={
						<ProtectedRoute userName={userNameCtx} currentUserRole="admin">
							<AdminPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/analyst"
					element={
						<ProtectedRoute userName={userNameCtx} currentUserRole="analyst">
							<AnalystPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profiles"
					element={
							<ProfileLayout />
					}
				/>
				<Route path="/areasofinterests" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="admin">
										<AreaofInterests />
									</ProtectedRoute>

				
				} />
					<Route path="/areasofinterestshome" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="admin">
										<Areaofinterestshomepage />
									</ProtectedRoute>

				
				} />
			
				<Route path="/specialtyhome" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="admin">
										<Specialtyhomepage />
									</ProtectedRoute>

				
				} />
				<Route path="/specialty" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="admin">
										<Specialty />
									</ProtectedRoute>

				
				} />
				<Route path="/analyst-areahome" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="analyst">
										<AnalystAreaofinteresthome />
									</ProtectedRoute>

				
				} />
				<Route path="/analyst-specialtyhome" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="analyst">
										<AnalystSpecialtyhome />
									</ProtectedRoute>

				
				} />
				<Route path="/analyst-area" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="analyst">
										<AnalystAreaofinterest />
									</ProtectedRoute>

				
				} />
				<Route path="/analyst-specialty" element={
									<ProtectedRoute userName={userNameCtx} currentUserRole="analyst">
										<AnalystSpecialty />
									</ProtectedRoute>

				
				} />
				<Route path='/profileRequested' element={<ProfileRequested />} />
				<Route path="/eg" element={<TabularData />} />

				<Route path="/layout" element={<ProfileLayout />} />

				{/* <Route path="*" element={<AdminPage />} /> */}
				
				<Route path="*" element={elementprofilepage} />

			</Routes>
		</BrowserRouter>
	);
}
const ProtectedRoute = ({ userName, children, currentUserRole }) => {
	
	if (userName !== currentUserRole) {
		return <Navigate to="/login" />;
	}
	return children;
};
