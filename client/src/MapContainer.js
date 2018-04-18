import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
// e05cfc65-e417-4bd6-a48b-859486e2adf6 

class MapContainer extends React.Component{

    state={}

    componentDidMount(){
        this.createMarkers()
    }

    onClick = (props, marker, e) => {
        this.setState({selected: props.title, distance: props.name})
        
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
                    zoom={14}
                    initialCenter={{ lat: 37.7257, lng: -122.4511 }}
                >
                {this.state.markers}
                </Map>
                {
                    this.state.selected && this.state.distance ?
                        alert(this.state.selected)
                    :
                        null
                }
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY")
  })(MapContainer)
