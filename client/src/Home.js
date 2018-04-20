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

    renderHomeComponents = () => {
       if(this.state.closeStops && this.state.selectedStop){
            return(
                <Container style={{padding: "20px"}}>
                <Grid divided style={{height:"95vh"}} columns={2}>
                    <Grid.Column width={3} >
                        <Input fluid placeholder={"Enter a SF Address"} />
                        <SidebardContainer selectedStop={this.state.selectedStop} 
                                           selectStop={this.selectStop} 
                                           stops={this.state.closeStops}/>
                    </Grid.Column>
                    <Grid.Column  width={13} >
                        <MapContainer selectedStop={this.state.selectedStop} 
                                      selectStop={this.selectStop} 
                                      stops={this.state.closeStops} />
                    </Grid.Column>
                </Grid>
            </Container>
            )
        }else if(this.state.closeStops)
        {
            return(
                <Container style={{padding: "20px"}}>
                    <Grid divided style={{height:"95vh"}} columns={2}>
                        <Grid.Column width={3} >
                            <Input fluid placeholder={"Enter a SF Address"} />
                            <SidebardContainer selectStop={this.selectStop} stops={this.state.closeStops}/>
                        </Grid.Column>
                        <Grid.Column  width={13} >
                            <MapContainer selectStop={this.selectStop} stops={this.state.closeStops} />
                        </Grid.Column>
                    </Grid>
                </Container>
            )

        }else{
            return(
                <h1>Loading ...</h1>
            )
        }
    }
    selectStop = (stop) => {
        this.setState({selectedStop: stop})
    }


    render(){
        return (this.renderHomeComponents())
    }
}
export default Home