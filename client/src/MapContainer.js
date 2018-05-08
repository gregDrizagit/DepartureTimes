import React from 'react'
import {Map, Marker, InfoWindow, Polyline, GoogleApiWrapper} from 'google-maps-react';
// e05cfc65-e417-4bd6-a48b-859486e2adf6 
import { Container } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { addVehicle, selectStop, monitoringStop } from './actions';




class MapContainer extends React.Component{

    state= {
        showingInfoWindow: false,
        zoom: this.props.zoom,
        activeMarker: null
    }



    componentDidMount(){
        this.createMarkers(this.props)
    }

    componentWillReceiveProps(next){


        if(next.stops && next.stops !== this.props.stops){
             this.resetMarkers(next)
        }

        if(next.isShowingVehicles && next.locations.length > 0){
            this.renderVehicleMarkers(next)
        }

        if(next.isShowingVehicles === false){
            //if we show departures and then stop showing departures 
            //we need to reset the markers 
            this.createMarkers(next)

        }

    }

    resetMarkers = (newLocations) => {
        this.removeOldLocationMarkers()
    }

    removeOldLocationMarkers = () => {
    
        this.setState({markers: null})
    }

  
    onClick = (props, marker, e) => {
        this.setState({activeMarker: marker, showingInfoWindow:true}) //zoom:18
            this.props.stops.forEach(stop => {
                if(stop.name === props.title) {

                    this.props.dispatch(selectStop({...stop, zoom: 18}))
                    this.props.dispatch(monitoringStop(stop))

                }
            })
        
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };
    

    renderVehicleMarkers = (props) => {

        
        this.removeMapMarkers(this.state.markers)
        const vehicleMarkers = props.locations.map(vehicle =>{
            return(
                <Marker
                    key={Math.random() * 100}
                    title={"Bus"}
                    position={{lat: vehicle.lat, lng: vehicle.lon}} 
                />
            )
        })

        this.setState({markers: vehicleMarkers})
        return vehicleMarkers
    }

    removeMapMarkers = (markers) => {
        
        const onlySelectedStop = markers.find(marker => {

               return  marker.props.title === this.props.selectedStop.name
            })
        this.setState({markers: onlySelectedStop, zoom: 15})
    }

    


    renderInfoWindows = () => {

        if(this.props.selectedStop){
            return(
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    >
                    <div>
                        this is an info window
                    </div>
                </InfoWindow>
            )
        }

    }

   

    createMarkers = (props) => {
        
        const markers = props.stops.map((stop) => {
            return (
                <Marker
                key={Math.random() * 100}
                title={stop.name}
                name={stop.distance}
                onClick={this.onClick}
                position={{lat: stop.lat, lng: stop.lon}} />
            )
        })

        this.setState({markers: markers})
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <Map google={this.props.google} 
                    zoom={this.state.zoom}
                    onClick={this.onMapClicked}
                    style={{height:"95%", width: "95%"}}
                    initialCenter={ {lat: this.props.userCurrentLocation.lat , 
                                     lng: this.props.userCurrentLocation.lon}}
                    center={{lat: this.props.userCurrentLocation.lat, lng: this.props.userCurrentLocation.lon}}>
                    
                    <Marker
                         name={'Your position'}
                         onClick={this.onClick}

                         position={{lat: this.props.userCurrentLocation.lat, lng: this.props.userCurrentLocation.lon}}
                         icon={{
                         url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                         anchor: new this.props.google.maps.Point(32,32),
                         scaledSize: new this.props.google.maps.Size(32,32)
                        }} />
                        

                    {
                        this.props.selectedStop ?
                         <Marker
                         onClick={this.onClick}
                         name={'Bus Stop'}
                         position={{lat: this.props.selectedStop.lat, lng: this.props.selectedStop.lon}}
                         />
                         :
                         null
                    }

                    
                    {/* {this.renderInfoWindows()} */}

                     <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        >
                        <div>
                            this is an info window
                        </div>
                     </InfoWindow>
                    
                    {this.state.markers}
                 
                </Map>

            </div>
        )
    }
}

const mapStateToProps = (state) => {

     return { locations: state.locations, 
        isLoading: state.isLoading, 
        userCurrentLocation: state.userCurrentLocation, 
        isShowingVehicles: state.isShowingVehicles,
        selectedStop: state.selectedStop
     }

  }
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY"),
    libraries: ['places']

  })(connect(mapStateToProps)(MapContainer))
