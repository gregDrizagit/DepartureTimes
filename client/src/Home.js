import React from 'react'
import MapContainer from './MapContainer'
import SidebardContainer from './SidebarContainer'
import Adapter from './Adapter'
import Utils from './Utils'
import { Container, Grid, Input } from 'semantic-ui-react'

class Home extends React.Component {

    state = {}

    componentDidMount(){
        Adapter.getStops().then(resp => {
            this.setState({stops: resp.Contents.dataObjects.ScheduledStopPoint})
        }).then(() => {
             let closeStops = Utils.computeClosestStation({lat: 37.7257 , lon: -122.4511}, this.state.stops)
             this.setState({closeStops: closeStops}); 
            }
        )

    }


    render(){
        if(this.state.closeStops)
        {
            return(
                <Container style={{padding: "20px"}}>
                    <Grid divided style={{height:"95vh"}} columns={2}>
                        <Grid.Column width={3} >
                            <Input fluid placeholder={"Enter a SF Address"} />
                            <SidebardContainer stops={this.state.closeStops}/>
                        </Grid.Column>
                        <Grid.Column  width={13} >
                            <MapContainer stops={this.state.closeStops} />
                        </Grid.Column>
                    </Grid>
                </Container>
            )
        }else{
            return(
                <h1>Loading...</h1>
            )
        }
    }
}
export default Home