import React from 'react'
import StopCard from './StopCard'
import DeparturesContainer from './DeparturesContainer'
import Adapter from './Adapter'
import { Segment, Button, Card } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addVehicle, showVehicles} from './actions'
import {Map, Marker, Listing, InfoWindow, Polyline, GoogleApiWrapper} from 'google-maps-react';

class SidebarContainer extends React.Component {

    state={
        showingDepartureTimes: false
    }

    showDepartureTimes = () => {
        this.setState({showingDepartureTimes: !this.state.showingDepartureTimes})
        this.props.dispatch(showVehicles(!this.state.showingDepartureTimes))

    }

    getDepartureTimes = () => {

        

    }

    

    renderStops = () => {

        const stopCards = this.props.stops.map(stop => <StopCard key={Math.random() * 100} selectStop={this.props.selectStop} stop={stop} />)
        return stopCards
    }

    render(){
        return(
            <div>
                {
                    this.props.selectedStop ? 
                        <div>
                            <Card
                                content={this.props.selectedStop.name}
                                description={this.props.selectedStop.distance}>
                            </Card>
                            <Button onClick={() => this.showDepartureTimes()}>Departure Times</Button>
                        </div>
                    :
                    null
                }
                {
                    this.state.showingDepartureTimes ?
                        <div>
                            <DeparturesContainer selectedStop={this.props.selectedStop} />
                        </div>
                    :
                        <Segment.Group>
                            {this.renderStops()}
                        </Segment.Group>
                

                }

               
            </div>
        )
    }
}


export default connect()(SidebarContainer)