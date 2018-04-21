class Utils {

    static haversine(){
        var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
       var lat1 = radians[0], lon1 = Math.abs(radians[1]), lat2 = radians[2], lon2 = Math.abs(radians[3]);
       var R = 6372.8; // km
       var dLat = lat2 - lat1;
       var dLon = lon2 - lon1;
       var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
       var c = 2 * Math.asin(Math.sqrt(a));
       return this.convertKmToMiles(R * c);
    }

    static convertKmToMiles(km){
        const conversion = 0.621371; 
        const miles = km * conversion; 
        return parseFloat(miles.toFixed(2));
    }
    
    static findStationsBelowThreshhold(stations){

        const threshold = 1; 
       const filteredStations = stations.filter(station =>{
           return station.distance < threshold
       })

       return filteredStations; 

    }

    static sortClosestStations(stations){

       const sorted = stations.sort(function(a, b){
            return a.distance - b.distance
        })

        return sorted
    }

    static computeClosestStation(myLocation, stops){
        const distancesBetweenUserAndStop = [] 

        stops.forEach((stop) => {
          let distance = this.haversine(parseFloat(stop.Location.Latitude), Math.abs(parseFloat(stop.Location.Longitude)), 
                                        myLocation.lat, myLocation.lon)

           let newStopObj = {id: stop.id, distance: distance, name: stop.Name, 
                            lat: stop.Location.Latitude, lon: stop.Location.Longitude}
            distancesBetweenUserAndStop.push(newStopObj)

        })

        const closeStations = this.findStationsBelowThreshhold(distancesBetweenUserAndStop); 

        const sorted = this.sortClosestStations(distancesBetweenUserAndStop);

        return sorted; 
        
    }

}
export default Utils