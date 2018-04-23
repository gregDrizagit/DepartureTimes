import React from 'react'
import { Segment } from 'semantic-ui-react'

class DepartureCard extends React.Component{

    calculateMinutesAway = () => {
        const arrivalTime = new Date(this.props.departure.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime);
        const now = new Date(); 
        const millisecondsAway = arrivalTime - now 
        const secondsAway = millisecondsAway / 1000
        const minutesAway = secondsAway / 60
        return Math.round(minutesAway)
    }

   
    render(){
        const departure = this.props.departure.MonitoredVehicleJourney
        return(
            <Segment onClick ={()=> this.monitorVehicle(departure) }>
                <h4>Line {departure.LineRef} - {this.calculateMinutesAway()} mins.</h4>
            </Segment>
        )
    }
}

export default DepartureCard; 