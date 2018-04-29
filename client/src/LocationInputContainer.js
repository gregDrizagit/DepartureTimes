import React from 'React' 
import {addVehicle} from './actions'
import {connect} from 'react-redux'
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

class LocationInputContainer extends React.Component{

    state = {}
    selectPlace = (address, placeId) => {
        console.log("Selected", placeId)
    }

    getCoordinatesForPlace = (placeId) => {
        geocodeByPlaceId(placeId)
        .then(console.log)
        .catch(error => console.error())
    }   

    renderPlaceSuggestions = (places, props) => {
        const placeSegments = places.map(place => {
            console.log(place)
         const className = places.active ? 'suggestion-item--active' : 'suggesion-item';
             return (
             <div {...props(place, {className})}>
                 {place.description}
             </div>
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

        >
        
           {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
                <Input
                {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                })}
                // value={this.state.input}
                />
                {
                    this.renderPlaceSuggestions(suggestions, getSuggestionItemProps)
                }
                                                        
            </div>
           )}
        </PlacesAutocomplete>
        )
    }
}





export default connect()(LocationInputContainer);