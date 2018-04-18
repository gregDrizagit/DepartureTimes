import React from 'react'
import MapContainer from './MapContainer'
import Adapter from './Adapter'
import Utils from './Utils'
class Home extends React.Component {

    state = {}

    componentDidMount(){
        Adapter.getStops().then(resp => {
            this.setState({stops: resp.Contents.dataObjects.ScheduledStopPoint})
        }).then(() => {
             let closeStops = Utils.computeClosestStation({lat: 37.7257 , lon: -122.4511}, this.state.stops)
             this.setState({closeStops: closeStops}); 
             console.log(this.state)
            }
        )

    }


    // 
    render(){
        if(this.state.closeStops)
        {
            return(
                <MapContainer stops={this.state.closeStops} />
            )
        }else{
            return(
                <h1>Loading...</h1>
            )
        }
    }
}
export default Home