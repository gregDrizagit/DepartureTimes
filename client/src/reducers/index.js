const vehiclesData = (state = {
    locations: [],
    userCurrentLocation:{
      lat: 37.7257, 
      lon: -122.4511
    }, 
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

        case 'SET_PLACE': 
      return {
        ...state,
        userCurrentLocation: action.userCurrentLocation
      }


      default:
      return state
    }
  }
  export default vehiclesData
