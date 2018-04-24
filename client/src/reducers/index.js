const vehiclesData = (state = {
    locations: [] 
}
, action) => {
    switch (action.type) {
      case 'ADD_VEHICLE':
        return {
          ...state,
            locations: action.locations
        }
      default:
        return state
    }
  }
  export default vehiclesData

    // location: {
    
            //         lat: action.location.lat,
            //         lon: action.location.lon
            // },