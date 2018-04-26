import React from 'react'
import DepartureCard from './DepartureCard'
import Adapter from './Adapter'
import { Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addVehicle} from './actions'
class DeparturesContainer extends React.Component {

    state = {

    }

    componentDidMount(){

        Adapter.getDepartureTimesForStop(this.props.selectedStop.id).then(departures => {
            this.dispatchDepartures(departures)
            this.setState({departures: departures.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit},
            this.monitorStop())
        })

    }

    monitorStop = () => {

        setInterval(() => {
            Adapter.getDepartureTimesForStop(this.props.selectedStop.id).then(departures => {
                this.dispatchDepartures(departures)
                this.setState({departures: departures.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit})
            })
        }, 30000)
    }

    dispatchDepartures = (departures) => {

        let dep = departures.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit
       const vehicleLocations =  dep.map(vehicle => {
            return {lat: vehicle.MonitoredVehicleJourney.VehicleLocation.Latitude, lon: vehicle.MonitoredVehicleJourney.VehicleLocation.Longitude}
        })
        this.props.dispatch(addVehicle(vehicleLocations))
    }
  

    renderDepartureCards = () => {
        const departureCards = this.state.departures.map(departure => {
            return <DepartureCard key={Math.random() * 100} departure={departure} />
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



export default connect()(DeparturesContainer)