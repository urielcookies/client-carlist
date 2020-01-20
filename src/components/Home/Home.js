import React from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Grid} from 'semantic-ui-react'

const Home = (props) => {
  return (
    <div style={{height: '80vh'}}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='center'>
            <Card onClick={() => props.history.push('/carlist')}>
              <Card.Content>
                <Card.Header content='Mine' />
                <Card.Meta content='uriel621@live.com' />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Card onClick={() => props.history.push('carlist')}>
              <Card.Content>
                <Card.Header content='Uriel' />
                <Card.Meta content='uriel621@live.com' />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>  
  );
};

export default withRouter(Home);
