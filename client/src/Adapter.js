
class Adapter {
    
    static getStops(){
        const apiKey = "e05cfc65-e417-4bd6-a48b-859486e2adf6"
        return fetch(`http://api.511.org/transit/stops?api_key=${apiKey}&operator_id=SF`)
        .then(resp => resp.text()).then(text => JSON.parse(text))
    }

}

export default Adapter