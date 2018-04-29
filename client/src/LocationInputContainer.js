import React from 'react' 
import {setPlace} from './actions'
import {connect} from 'react-redux'
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng, geocodeByAddress } from 'react-places-autocomplete'
import { Segment, Input } from 'semantic-ui-react'
import {GoogleApiWrapper} from 'google-maps-react';

class LocationInputContainer extends React.Component{

    state = {}

    selectPlace = (address, placeId) => {
        this.getCoordinatesForPlace(address)
    }

    getCoordinatesForPlace = (address, placeId) => {
     
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => this.props.dispatch(setPlace({lat: lat, lon:lng})))
        // resp => getLatLng(resp)
    }   

    renderPlaceSuggestions = (places, props) => {
        const placeSegments = places.map(place => {
            console.log(place)
         const className = places.active ? 'suggestion-item--active' : 'suggesion-item';
             return (
             <Segment {...props(place, {className})}>
                 {place.description}
             </Segment>
             )
         })
 
         return placeSegments
     }

      

    render(){
        return(
            <PlacesAutocomplete 
            value={this.state.input}
            onChange={input => this.setState({input})}
            onSelect={this.selectPlace}
            searchOptions = {{
                location: new this.props.google.maps.LatLng(37.7257, -122.4511),
                radius: 2000
             }
            }

        >
        
           {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
                <Input
                size="large"
                {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                })}
                // value={this.state.input}
                />
                {
                    <Segment.Group style={{position: "absolute", zIndex: 1}}>
                         {this.renderPlaceSuggestions(suggestions, getSuggestionItemProps)}
                    </Segment.Group>
                }
                                                        
            </div>
           )}
        </PlacesAutocomplete>
        )
    }
}



// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY"),
//     libraries: ['places']

//   })

  export default GoogleApiWrapper({
    apiKey: ("AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY"),
    libraries: ['places']

  })(connect()(LocationInputContainer))

// export default connect()(LocationInputContainer);