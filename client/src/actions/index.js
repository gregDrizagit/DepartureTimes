

export const addVehicle = loc => ({
  type: 'ADD_VEHICLE',
  locations:loc  
})

export const showVehicles = isShowingVehicles => ({
  type: 'SHOW_VEHICLES',
  isShowingVehicles: isShowingVehicles   
})

