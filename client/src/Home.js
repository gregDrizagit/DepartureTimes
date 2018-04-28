import React from 'react'
import MapContainer from './MapContainer'
import SidebardContainer from './SidebarContainer'
import Adapter from './Adapter'
import Utils from './Utils'
import {connect} from 'react-redux'
import {addVehicle} from './actions'
import { bindActionCreators } from 'redux'
import PlacesAutocomplete from 'react-places-autocomplete'
import { Container, Grid, Input } from 'semantic-ui-react'

class Home extends React.Component {

    state = {
       userLocation: {
           lat:  37.7257,
           lon: -122.4511
       },
       mapFocus: {
           lat: 37.7257, 
           lon: -122.4511
       }

    }

    componentDidMount(){

        Adapter.getStops().then(resp => {
            this.setState({stops: resp.Contents.dataObjects.ScheduledStopPoint})
        }).then(() => {
             let closeStops = Utils.computeClosestStation({lat: this.state.userLocation.lat , lon: this.state.userLocation.lon}, this.state.stops)
             this.setState({closeStops: closeStops}); 
            }
        )

    }

    onChange = () => {
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
                        <MapContainer userLocation={this.state.userLocation}
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
                            <PlacesAutocomplete 
                                value={this.state.input}
                                onChange={input => this.setState({input})}
                                onSelect={this.handleSelect}
                            >
                            
                               {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                                <div>
                                    <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input'
                                    })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                        )
                                    })}
                                    </div>
                                    
                                </div>
                               )}
                               

                            </PlacesAutocomplete>
                            <SidebardContainer  selectStop={this.selectStop} 
                                                stops={this.state.closeStops}/>
                        </Grid.Column>
                        <Grid.Column  width={13} >
                            <MapContainer userLocation={this.state.userLocation}
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
    }


    render(){
        console.log(this.state.input)
        return (this.renderHomeComponents())
    }

}


const mapStateToProps = (state, ownProps) => {
    return { locations: state.locations, ownProps }

  }

  

export default connect(mapStateToProps)(Home)