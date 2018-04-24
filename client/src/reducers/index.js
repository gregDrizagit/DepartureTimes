const vehiclesData = (state = {
    locations: [], 
    isShowingVehicles: false 
}
, action) => {
    switch (action.type) {
      case 'ADD_VEHICLE':
        return {
          ...state,
            locations: action.locations
        }
      case 'SHOW_VEHICLES':
        return {
          ...state,
          isShowingVehicles: action.isShowingVehicles
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