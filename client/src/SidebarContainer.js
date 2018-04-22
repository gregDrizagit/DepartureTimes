import React from 'react'
import StopCard from './StopCard'
import DeparturesContainer from './DeparturesContainer'
import Adapter from './Adapter'
import { Segment, Button, Card } from 'semantic-ui-react'

class SidebarContainer extends React.Component {

    state={
        showingDepartureTimes: false
    }

    showDepartureTimes = () => {
        this.setState({showingDepartureTimes: !this.state.showingDepartureTimes})
    }

    getDepartureTimes = () => {

        

    }

    renderStops = () => {

        const stopCards = this.props.stops.map(stop => <StopCard stop={stop} />)
        return stopCards
    }
    render(){
        return(
            <div>
                {
                    this.props.selectedStop ? 
                        <div>
                            <Card
                                content={this.props.selectedStop.name}>
                            </Card>
                            <Button onClick={() => this.showDepartureTimes()}>Departure Times</Button>
                        </div>
                    :
                    null
                }
                {
                    this.state.showingDepartureTimes ?
                        <DeparturesContainer selectedStop={this.props.selectedStop} />
                    :
                        <Segment.Group>
                            {this.renderStops()}
                        </Segment.Group>
                

                }
               
            </div>
        )
    }
}

export default SidebarContainer