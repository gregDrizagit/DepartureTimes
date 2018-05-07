const vehiclesData = (state = {
    locations: [],
    userCurrentLocation:{
      lat: 37.7257, 
      lon: -122.4511
    }, 
    isShowingVehicles: false,
    viewingLocation: "...", 
    monitoringStop: "", 
    isLoading: true
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

      case 'VIEWING_LOCATION': 
        return {
          ...state,
          viewingLocation: action.viewingLocation
        }

        case 'MONITORING_STOP': 
        return {
          ...state,
          monitoringStop: action.monitoringStop
        }

        case 'IS_LOADING': 
        return {
          ...state,
          isLoading: action.isLoading
        }
        case 'SELECT_STOP':
        return {
          ...state,
          selectedStop: action.selectedStop
        }

      default:
      return state
    }
  }
  export default vehiclesData
