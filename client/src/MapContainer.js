import React from 'react'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
// e05cfc65-e417-4bd6-a48b-859486e2adf6 
import { Container } from 'semantic-ui-react'

class MapContainer extends React.Component{

    state= {
        showingInfoWindow: false,
        zoom: 14

    }

    componentDidMount(){
        this.createMarkers()
    }

    onClick = (props, marker, e) => {
        this.setState({activeMarker: marker, showingInfoWindow: !this.state.showingInfoWindow})
    
        this.props.stops.forEach(stop => {
            if(stop.name === props.title) {

             this.props.selectStop(stop)

            }
        })
    }

    


    renderInfoWindows = () => {

        if(this.props.selectStop)
        {
        return(
            <InfoWindow
                marker={this.state.activeMarker}
                visible={true}
                >
                <div>
                    <h1>asdfdsafdsa</h1>
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
                    zoom={this.state.zoom}
                    style={{width:"95%", height: "95%"}}
                    initialCenter={{ lat: 37.7257, lng: -122.4511 }}>
                {this.state.markers}
                {this.renderInfoWindows()}

                </Map>

              
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY")
  })(MapContainer)
