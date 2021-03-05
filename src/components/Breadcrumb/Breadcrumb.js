import React from 'react';
import {filter, forEach, includes, map, split, upperFirst} from 'lodash';
import {Link} from 'react-router-dom';
import {Breadcrumb, Container, Divider} from 'semantic-ui-react';

const Breadcrumbs = (props) => {
	const paths = split(props.location.pathname, '/');
	const userId = paths[3];
	const filtered = filter(paths, path => !Number(path)).slice(1);

	const routes = [];

	forEach(filtered, (path, index) => {
		const lastIndex = index === filtered.length - 1;
		if (path === 'home') {
			return routes.push({
				active: lastIndex,
				link: '/home',
				title: 'Home'
			});
		}
		if (path === 'carlist') {
			return routes.push({
				active: lastIndex,
				link: `/home/carlist/${userId}`,
				title: 'Inventory'
			});
		}
		if (path === 'mycarlist') {
			return routes.push({
				active: lastIndex,
				link: '/home/mycarlist',
				title: 'Inventory'
			});
		}
		if (path === 'addcar') {
			return routes.push({
				active: lastIndex,
				link: '/home/mycarlist/addcar',
				title: 'Add New Car'
			});
		}

		const route = props.history.location.pathname
			.substring(props.history.location.pathname.lastIndexOf('/') + 1);
  
		return routes.push({
			active: lastIndex,
			link: path,
			// title: upperFirst(path)
			title: includes(['info', 'expenses', 'data', 'pics', 'status'], route)
				? 'Details'
				: upperFirst(path)
		});
	});

	
	return (
		<Container id="breadcrumb" style={{height: '7vh'}}>
			<Breadcrumb size="large">
				{map(routes, (route) => (
					<React.Fragment key={route.title}>
						<Breadcrumb.Section>
							{
								!route.active 
									? <Link style={{color: '#00b5ad'}} to={route.link}>{route.title}</Link>
									: route.title
							}
						</Breadcrumb.Section>
						{!route.active && <Breadcrumb.Divider icon='right chevron' />}
					</React.Fragment>
				))}
			</Breadcrumb>
			<Divider />
		</Container>
	);
};

export default Breadcrumbs;
