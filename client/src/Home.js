import React from 'react'
import MapContainer from './MapContainer'
import SidebardContainer from './SidebarContainer'
import Adapter from './Adapter'
import Utils from './Utils'
import {connect} from 'react-redux'
import {addVehicle, monitoringStop} from './actions'
import HeaderContainer from './HeaderContainer'
import { Container, Segment, Sticky, Rail, Dropdown, Loader, Grid, Input } from 'semantic-ui-react'

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
    handleContextRef = contextRef => this.setState({ contextRef })


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
   
    // style={{padding: "20px"}}
    renderHomeComponents = () => {

       if(this.state.closeStops && this.state.selectedStop){

            return(
                <div>
                    <HeaderContainer />
                    <Grid style={{height:"83vh"}} columns={2}>
                        <Grid.Column width={4} >
                            <Segment basic style={{height: window.innerHeight - 130, overflow: "scroll"}}>
                                <SidebardContainer 
                                                selectedStop={this.state.selectedStop} 
                                                selectStop={this.selectStop} 
                                                trackVehicle={this.trackVehicle}
                                                stops={this.state.closeStops}/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={12} >
                                <MapContainer userLocation={this.props.userCurrentLocation}
                                            zoom ={this.state.zoom}
                                            mapFocus={this.state.mapFocus} 
                                            vehicleLocations={this.props.locations}
                                            selectedStop={this.state.selectedStop} 
                                            selectStop={this.selectStop} 
                                            stops={this.state.closeStops} />
                        </Grid.Column>
                    </Grid>
                </div>
            )
        }else if(this.state.closeStops)
        {
            return(
                <div>
                    <HeaderContainer />

                    <Grid style={{height:"83vh"}} columns={2}>
                        <Grid.Column width={4}>
                            <Segment basic style={{height: window.innerHeight - 130, overflow: "scroll"}}>

                    
                            <SidebardContainer  selectStop={this.selectStop} 
                                                stops={this.state.closeStops}/>
                            </Segment>
                        </Grid.Column> 
                        <Grid.Column width={12}>
                            <MapContainer userLocation={this.props.userCurrentLocation}
                                                mapFocus={this.state.mapFocus}
                                                vehicleLocation={this.props.locations}
                                                zoom={this.state.zoom}
                                                selectStop={this.selectStop} 
                                                stops={this.state.closeStops} />
                        </Grid.Column>
                    </Grid>


                    {/* <Grid divided style={{height:"95vh"}} columns={2}>
                        <Grid.Column width={4}> 
                            
                        </Grid.Column>
                        <Grid.Column width={12}>
            
                         
                        </Grid.Column>
                    </Grid> */}
                </div>
            )

        }else{
            return(
                <Loader />
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
                {this.renderHomeComponents()}
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return { locations: state.locations, userCurrentLocation: state.userCurrentLocation }

  }

  

export default connect(mapStateToProps)(Home)