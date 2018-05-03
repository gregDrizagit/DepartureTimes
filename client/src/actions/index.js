

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

export const viewingLocation = location => ({
  type: 'VIEWING_LOCATION',
  viewingLocation: location   
})

export const monitoringStop = monitoringStop => ({
  type: 'MONITORING_STOP',
  monitoringStop: monitoringStop   
})

export const isLoading = isLoading => ({
  type: 'IS_LOADING',
  isLoading: isLoading   
})


