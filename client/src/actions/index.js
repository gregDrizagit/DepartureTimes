

export const addVehicle = loc => ({
  type: 'ADD_VEHICLE',
  locations:loc  
})

export const showVehicles = isShowingVehicles => ({
  type: 'SHOW_VEHICLES',
  isShowingVehicles: isShowingVehicles   
})

export const setPlace = place => ({
  type: 'SET_PLACE',
  userCurrentLocation: place   
})
///a place is the user's locatioin as defined by google places api. in userCurrentLocation, 
//we're only holding the place's coordinates.

export const viewingLocation = location => ({
  type: 'VIEWING_LOCATION',
  viewingLocation: location   
})//viewing location holds the name if the place we're currently viewing

export const monitoringStop = monitoringStop => ({
  type: 'MONITORING_STOP',
  monitoringStop: monitoringStop   
})//monitoring stop is a boolean representing the current activity of the program

export const isLoading = isLoading => ({
  type: 'IS_LOADING',
  isLoading: isLoading   
})

export const selectStop = selectedStop => ({
  type: 'SELECT_STOP',
  selectedStop: selectedStop   
})
//a stop is a bus stop


