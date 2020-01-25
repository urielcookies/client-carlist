import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Dimmer, Icon, Grid, Loader, Container} from 'semantic-ui-react'
import {fetchActiveAccount, fetchUsers} from '../../endpoints';

const Home = (props) => {
  const [isActiveLoading, setIsActiveAccountLoading] = useState(true);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  const [activeAccount, setActiveAccount] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchActiveAccount({isActiveLoading, setIsActiveAccountLoading, setActiveAccount})
    fetchUsers({isUsersLoading, setIsUsersLoading, setUsers});
  }, []);

  return (
    <div style={{height: '80vh'}}>
      {isActiveLoading || isUsersLoading
      ? <Dimmer active inverted page>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      : <Container textAlign='center'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Card centered onClick={() => props.history.push(`/home/carlist`)}>
                  <Card.Content>
                    <Icon name='folder open outline' color="black" size='big' />
                    <Card.Header style={ellipsisStyle} title={activeAccount.Username} content={activeAccount.Username} />
                    <Card.Meta style={ellipsisStyle} title={activeAccount.Email} content={activeAccount.Email} />
                  </Card.Content>
                </Card>
              </Grid.Column>

              {users.map((user) => (
                <Grid.Column textAlign='center' key={user.Id}>
                  <Card centered onClick={() => props.history.push(`/home/carlist/${user.Id}`)}>
                    <Card.Content>
                      <Icon name='folder open outline' color="black" size='big' />
                      <Card.Header style={ellipsisStyle} content={user.Username} />
                      <Card.Meta style={ellipsisStyle} content={user.Email} />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Container>}
      </div>  
  );
};

const ellipsisStyle = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

// const textTruncate = (str, length, ending) => {
//   if (length == null) length = 100;
  
//   if (ending == null) ending = '...';
  
//   if (str.length > length) 
//     return str.substring(0, length - ending.length) + ending;
//   else
//     return str;
// };

export default withRouter(Home);
