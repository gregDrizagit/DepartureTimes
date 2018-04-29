

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

