import React from 'react'
import { Segment } from 'semantic-ui-react'

class StopCard extends React.Component{
    
    state = {
    }

    handleSelect = () => { 
        this.props.selectStop(this.props.stop)
    }
    render(){
        return(
            <Segment         
                onClick={() => this.handleSelect() }>
                {this.props.stop.name}
                - {this.props.stop.distance} miles
            </Segment>
        )
    }
}
export default StopCard