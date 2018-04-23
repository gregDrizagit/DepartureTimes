const vehiclesData = (state = [], action) => {
    switch (action.type) {
      case 'ADD_VEHICLE':
        return {
          ...state,
            lat: action.lat,
            lon: action.lon,
          
        }
      default:
        return state
    }
  }
  export default vehiclesData