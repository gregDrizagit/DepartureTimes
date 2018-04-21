const apiKey = "e05cfc65-e417-4bd6-a48b-859486e2adf6"

class Adapter {

    static getStops(){
        return fetch(`http://api.511.org/transit/stops?api_key=${apiKey}&operator_id=SF`)
        .then(resp => resp.text()).then(text => JSON.parse(text))
    }

    static getDepartureTimesForStop (stopCode) {
        return fetch(`http://api.511.org/transit/StopMonitoring?api_key=${apiKey}&agency=SF&stopCode=${stopCode}`)
        .then(resp => resp.text()).then(text => JSON.parse(text)).then(console.log)
    }

    static getStopTimetable (stopCode) {

        return fetch(`http://api.511.org/transit/stoptimetable?api_key=${apiKey}&MonitoringRef=${stopCode}&OperatorRef=SF`,{
            method: "GET"
        })
        .then(resp => console.log(resp))
        
    }
    // 58772
}

export default Adapter

