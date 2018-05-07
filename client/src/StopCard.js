import React from 'react'
import { Segment } from 'semantic-ui-react'
import {selectStop} from './actions'
import {connect} from 'react-redux'

class StopCard extends React.Component{
    
    state = {
    }

    handleSelect = () => { 
        // this.props.selectStop(this.props.stop)
        this.props.dispatch(selectStop({...this.props.stop, zoom: 18}))

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
export default connect()(StopCard);