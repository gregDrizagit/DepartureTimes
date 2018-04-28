const oldToken = "e05cfc65-e417-4bd6-a48b-859486e2adf6"
const newToken = "a7002c89-cf65-45f6-a7c5-b1b2ea8f7972"
class Adapter {

    static getStops(){
        return fetch(`http://api.511.org/transit/stops?api_key=${oldToken}&operator_id=SF`)
        .then(resp => resp.text()).then(text => JSON.parse(text))
    }

    static getDepartureTimesForStop (stopCode) {
        return fetch(`http://api.511.org/transit/StopMonitoring?api_key=${newToken}&agency=SF&stopCode=${stopCode}`)
        .then(resp => resp.text()).then(text => JSON.parse(text))
    }

    
    static monitorVehicle (vehicleId) {
        return fetch(`http://api.511.org/transit/VehicleMonitoring?api_key={yourkey}&agency=AC&vehicleID=${vehicleId}`)
        .then(resp => resp.text()).then(text => JSON.parse(text))
    }

    static googlePlacesAutocomplete(place) {
        return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&types=establishment&location=37.76999,-122.44696&radius=500&strictbounds&key=AIzaSyDO0hnqbkqmrcIW8AgORQWh-8ogRnT3rqY`)
        .then(resp => resp.json()).then(console.log())
    }
}

export default Adapter

