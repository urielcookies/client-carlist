import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

// import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import AddCarForm from './components/AddCarForm/AddCarForm';
import Carlist from './components/Carlist/Carlist';
import DetailsForm from './components/DetailsForm/DetailsForm';
import Login from './components/Login/Login';
import Trip from './components/Trip/Trip';
import Home from './components/Home/Home';
import Settings from './components/Settings/Settings';
import TypeScriptTest from './components/TypeScriptTest/TypeScriptTest.tsx';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import NotFound from './components/NotFound/NotFound';

import { getCookie, fetchActiveUser } from './endpoints/index';

const Routes = (props) => {
	const [activeUser, setActiveUser] = useState(null);
	const [activeUserLoading, setActiveUserLoading] = useState(true);

	useEffect(() => {
		if (getCookie('token')) {
			fetchActiveUser()
				.then((response) => {
					if (response && response.data) setActiveUser(response.data);
					setActiveUserLoading(false);
				});
		} else setActiveUserLoading(false);
	}, []);

	const withLogin = (Component) => (ComponentProps) =>
		!getCookie('token')
			? <Redirect to="/login" />
			: <Component {...{ ...ComponentProps, activeUser }} />;

	const SUP = () => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Hey</div>;
	return (
		<div>
			<Navbar showLogin={getCookie('token')} />
			<div style={{ height: '2vh' }} />
			{/* {getCookie('token') ? <Breadcrumb {...props} /> : <div style={{ height: '7vh' }} />} */}
			<Container id="content" style={{ height: '93vh', borderBottom: '1px solid red', overflowY: 'hidden' }}>
				{activeUserLoading
					? (
						<Dimmer active inverted>
							<Loader inverted>Loading</Loader>
						</Dimmer>
					)
					: (
						<Switch>
							<Route exact path='/' component={SUP} />
							<Route exact path='/home' component={withLogin(Home)} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/home/mycarlist/addcar' component={withLogin(AddCarForm)} />
							<Route exact path='/trip' component={Trip} />
							<Route exact path='/details/:id/:tab' component={withLogin(DetailsForm)} />
							<Route exact path='/home/settings' component={withLogin(Settings)} />
							<Route exact path='/home/:carlist' component={withLogin(Carlist)} />
							<Route exact path='/home/:carlist/:userId' component={withLogin(Carlist)} />
							<Route exact path='/home/:carlist/:userId/:carInfoId/:tab' component={withLogin(DetailsForm)} />
							<Route path='/404' component={NotFound} />
							<Redirect from='*' to='/404' />
						</Switch>
					)}
			</Container>
			{/* <Footer /> */}
			{getCookie('token') ? <TypeScriptTest /> : <Footer />}
		</div>
	);
};

export default withRouter(Routes);
