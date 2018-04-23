import React from 'react'
import {Map, Marker, InfoWindow, Polyline, GoogleApiWrapper} from 'google-maps-react';
// e05cfc65-e417-4bd6-a48b-859486e2adf6 
import { Container } from 'semantic-ui-react'



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

    renderVehicle = () => {



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
                title={stop.name}
                name={stop.distance}
                onClick={this.onClick}
                position={{lat: stop.lat, lng: stop.lon}} />
            )
        })

        this.setState({markers: markers})
    }

    render(){

        return(
            <div>
                <Map google={this.props.google} 
                    zoom={this.props.zoom}
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

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY"),
    libraries: ['places']

  })(MapContainer)
