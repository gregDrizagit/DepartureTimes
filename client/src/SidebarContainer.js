import React from 'react'
import StopCard from './StopCard'
import { Segment, Card } from 'semantic-ui-react'

class SidebarContainer extends React.Component {

    renderStops = () => {

        const stopCards = this.props.stops.map(stop => <StopCard stop={stop} />)
        return stopCards
    }
    render(){
        return(
            <div>
                {
                    this.props.selectedStop ? 
                        <Card
                            content={this.props.selectedStop.name}>
                        </Card>
                    :
                    null
                }

                <Segment.Group>
                    {this.renderStops()}
                </Segment.Group>
                
            </div>
        )
    }
}

export default SidebarContainer