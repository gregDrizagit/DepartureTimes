import React from 'react'
import MapContainer from './MapContainer'
import SidebardContainer from './SidebarContainer'
import Adapter from './Adapter'
import Utils from './Utils'
import {connect} from 'react-redux'
import {addVehicle, monitoringStop} from './actions'
import HeaderContainer from './HeaderContainer'
import { Container, Segment, Dropdown, Grid, Input } from 'semantic-ui-react'

class Home extends React.Component {

    state = {
       userLocation: {
           lat:  this.props.userCurrentLocation.lat,
           lon: this.props.userCurrentLocation.lon
       },
       mapFocus: {
           lat: 37.7257, 
           lon: -122.4511
       },
       input:""

    }

    componentDidMount(){

       
        this.getStopsNearUserLocation()

    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){

            this.getStopsNearUserLocation()
        }
    }

    getStopsNearUserLocation = () => {

        Adapter.getStops().then(resp => {
            this.setState({stops: resp.Contents.dataObjects.ScheduledStopPoint})
        }).then(() => {
             let closeStops = Utils.computeClosestStation({lat: this.props.userCurrentLocation.lat , lon: this.props.userCurrentLocation.lon}, this.state.stops)
             this.setState({closeStops: closeStops}); 
        })
    }
   

    renderHomeComponents = () => {
       if(this.state.closeStops && this.state.selectedStop){
            return(
                <Container style={{padding: "20px"}}>

                <Grid divided style={{height:"95vh"}} columns={2}>
                    <Grid.Column width={3} >
                     
                        <SidebardContainer 
                                           selectedStop={this.state.selectedStop} 
                                           selectStop={this.selectStop} 
                                           trackVehicle={this.trackVehicle}
                                           stops={this.state.closeStops}/>
                    </Grid.Column>
                    <Grid.Column  width={13} >
                        <MapContainer userLocation={this.props.userCurrentLocation}
                                      zoom ={this.state.zoom}
                                      mapFocus={this.state.mapFocus} 
                                      vehicleLocations={this.props.locations}
                                      selectedStop={this.state.selectedStop} 
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
                       
                            <SidebardContainer  selectStop={this.selectStop} 
                                                stops={this.state.closeStops}/>
                        </Grid.Column>
                        <Grid.Column  width={13} >
                            <MapContainer userLocation={this.props.userCurrentLocation}
                                          mapFocus={this.state.mapFocus}
                                          vehicleLocation={this.props.locations}
                                          zoom={this.state.zoom}
                                          selectStop={this.selectStop} 
                                          stops={this.state.closeStops} />
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
        const newFocusPosition = {lat: parseFloat(stop.lat), lon: parseFloat(stop.lon)}
        this.setState({selectedStop: stop, mapFocus: newFocusPosition, zoom: 18})
        this.props.dispatch(monitoringStop(stop))
    }

   
    render(){
        return (
            <div>
                <HeaderContainer />
                {this.renderHomeComponents()}
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return { locations: state.locations, userCurrentLocation: state.userCurrentLocation }

  }

  

export default connect(mapStateToProps)(Home)