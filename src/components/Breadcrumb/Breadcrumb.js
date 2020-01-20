import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Container, Divider} from 'semantic-ui-react'

const Breadcrumbs = (props) => {
  const paths = props.location.pathname.split('/');
  if (paths[0] === '') paths[0] = '/';
  if (paths[1] === '') paths.pop();
  if (Number(paths[2])) paths.splice(2, 1);

  const routes = [];

  paths.map((path, index) => {
    const lastIndex = index === paths.length - 1;

    if (path === '/') {
      return routes.push({
        active: lastIndex,
        link: '/',
        title: 'Home'
      });
    } else if (path === 'carlist') {
      return routes.push({
        active: lastIndex,
        link: '/carlist',
        title: "(users) Inventory"
      });
    }
    return routes.push({
      active: lastIndex,
      link: path,
      title: path
    });
  });

  return (
    <Container>
      <Breadcrumb size="large">
        {routes.map((route, index) => (
          <React.Fragment key={`route-${index}`}>
            <Breadcrumb.Section>
              {
                !route.active 
                ? <Link to={route.link}>{route.title}</Link>
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
