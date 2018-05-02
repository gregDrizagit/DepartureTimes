import React from 'react'
import LocationInputContainer from './LocationInputContainer'
import { Header, Container, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'


class HeaderContainer extends React.Component {

    state = {}

    componentDidMount(){

        this.setState({status: `Viewing stops near ${this.props.viewingLocation}`})
    }

   componentWillReceiveProps(next){

        if(next !== this.props){

            this.renderStatusHeader(next)

        }

   }

   renderStatusHeader = (props) => {

        let statusMessage = ""

       if(props.isShowingVehicles){

             statusMessage = `Monitoring bus departures for ${props.monitoringStop.name}`

       }else{

           statusMessage = `Viewing stops near ${props.viewingLocation}`

       }

       this.setState({status: statusMessage})

   }
    
    render(){
        console.log("header props", this.props)
        return(
            <Segment compact basic clearing>
                <Header style={{paddingTop: "20px"}} floated="left">
                    <LocationInputContainer setCurrentlyMonitoring={this.setCurrentlyMonitoring} />
                </Header>
                    {
                        this.state.status ? 
                            <Header style={{paddingTop:20}} floated="left">
                                <h1>{this.state.status}</h1>
                            </Header>
                        :
                        null
                    }
            </Segment>
        )
    }

}

const mapStateToProps = (state) => {
    return { locations: state.locations, monitoringStop: state.monitoringStop, isShowingVehicles: state.isShowingVehicles, viewingLocation: state.viewingLocation, userCurrentLocation: state.userCurrentLocation }

  }

export default connect(mapStateToProps)(HeaderContainer)