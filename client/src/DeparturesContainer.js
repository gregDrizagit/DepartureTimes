import React from 'react'
import DepartureCard from './DepartureCard'
import Adapter from './Adapter'
import { Segment } from 'semantic-ui-react'

class DeparturesContainer extends React.Component {

    state = {}
    componentDidMount(){
        console.log("mounted")
        Adapter.getDepartureTimesForStop(this.props.selectedStop.id).then(departures => {
            this.setState({departures: departures.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit})
        })

    }

    renderDepartureCards = () => {
        const departureCards = this.state.departures.map(departure => {
            return <DepartureCard departure={departure} />
        })
        return departureCards
    }

    render(){
        if(this.state.departures)
        {
            return(
                <Segment.Group>
                    {this.renderDepartureCards()}
                </Segment.Group>
            )
        }else{
            return(
                <h4>Loading...</h4>
            )
        }
    }
}
export default DeparturesContainer