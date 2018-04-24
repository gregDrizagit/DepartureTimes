import React from 'react'
import {Map, Marker, InfoWindow, Polyline, GoogleApiWrapper} from 'google-maps-react';
// e05cfc65-e417-4bd6-a48b-859486e2adf6 
import { Container } from 'semantic-ui-react'
import {connect} from 'react-redux'




class MapContainer extends React.Component{

    state= {
        showingInfoWindow: false,
        zoom: this.props.zoom
    }

   

    componentDidMount(){
        this.createMarkers()
    }

    onClick = (props, marker, e) => {
        this.setState({activeMarker: marker, showingInfoWindow: !this.state.showingInfoWindow, zoom: 18})
    
        this.props.stops.forEach(stop => {
            if(stop.name === props.title) {

             this.props.selectStop(stop)

            }
        })
    }

    renderVehicleMarkers = () => {

        
        this.removeMapMarkers(this.state.markers)
        console.log(this.state)
        const vehicleMarkers = this.props.locations.map(vehicle =>{
            return(
                <Marker
                         position={{lat: vehicle.lon, lng: vehicle.lat}}
                         icon={{
                         url: "https://icons8.com/icon/240/bus",
                         anchor: new this.props.google.maps.Point(32,32),
                         scaledSize: new this.props.google.maps.Size(32,32)
                        }} />
            )
        })

        this.setState({vehicleMarkers: vehicleMarkers})
    }

    removeMapMarkers = (markers) => {
        
        const onlySelectedStop = markers.find(marker => {
               return  marker.props.title === this.props.selectedStop.name
            })
        this.setState({markers: onlySelectedStop, zoom: 15})
    }

    


    renderInfoWindows = () => {

        if(this.props.selectedStop)
        {
        return(
            <InfoWindow
                marker={this.state.activeMarker}
                visible={true}
                >
                <div>
                    <h3>{this.props.selectedStop.name} - {this.props.selectedStop.distance} miles away</h3>
                </div>
            </InfoWindow>
        )
    }

    }

   

    createMarkers = () => {

        const markers = this.props.stops.map((stop) => {
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
        console.log("MAP props" ,this.props)
        return(
            <div>
                <Map google={this.props.google} 
                    zoom={this.state.zoom}
                    style={{width:"95%", height: "95%"}}
                    initialCenter={ {lat: this.props.userLocation.lat , 
                                     lng: this.props.userLocation.lon}}
                    center={{lat: this.props.mapFocus.lat, lng: this.props.mapFocus.lon}}>
                    
                    <Marker
                         name={'Your position'}
                         position={{lat: this.props.userLocation.lat, lng: this.props.userLocation.lon}}
                         icon={{
                         url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                         anchor: new this.props.google.maps.Point(32,32),
                         scaledSize: new this.props.google.maps.Size(32,32)
                        }} />

                    
                    {this.renderInfoWindows()}


                    {this.state.markers}
                 
                </Map>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

     return { locations: state.locations, isShowingVehicles: state.isShowingVehicles }

  }
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY"),
    libraries: ['places']

  })(connect(mapStateToProps)(MapContainer))
