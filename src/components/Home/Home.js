import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Dimmer, Icon, Grid, Loader, Container} from 'semantic-ui-react'
import {fetchUsers} from '../../endpoints';

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers({isLoading, setIsLoading, setUsers});
  }, []);

  console.log(users);
  return (
    <div style={{height: '80vh'}}>
      {isLoading
      ? <Dimmer active inverted page>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      : <Container textAlign='center'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Card centered onClick={() => props.history.push(`/home/carlist/1`)}>
                  <Card.Content>
                    <Icon name='folder open outline' color="black" size='big' />
                    <Card.Header content='Mine' />
                    <Card.Meta content='myemail@live.com' />
                  </Card.Content>
                </Card>
              </Grid.Column>

              {users.map((user) => (
                <Grid.Column textAlign='center' key={user.Id}>
                  <Card centered onClick={() => props.history.push(`/home/carlist/${user.Id}`)}>
                    <Card.Content>
                      <Icon name='folder open outline' color="black" size='big' />
                      <Card.Header content={user.Username} />
                      <Card.Meta content={user.Email} />
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

export default withRouter(Home);
