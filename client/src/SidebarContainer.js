import React from 'react'
import StopCard from './StopCard'
import { Segment } from 'semantic-ui-react'

class SidebarContainer extends React.Component {

    renderStops = () => {

        const stopCards = this.props.stops.map(stop => <StopCard stop={stop} />)
        return stopCards
    }
    render(){
        return(
            <Segment.Group>
                {this.renderStops()}
            </Segment.Group>
        )
    }
}

export default SidebarContainer