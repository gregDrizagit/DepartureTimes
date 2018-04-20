import React from 'react'
import { Segment } from 'semantic-ui-react'

class StopCard extends React.Component{

    render(){
        return(
            <Segment>
            {this.props.stop.name}
            - {this.props.stop.distance} miles
            </Segment>
        )
    }
}
export default StopCard