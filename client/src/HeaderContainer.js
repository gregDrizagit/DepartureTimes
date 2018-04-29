import React from 'react'
import LocationInputContainer from './LocationInputContainer'
import { Header, Container } from 'semantic-ui-react'

const HeaderContainer = () => {

    return(
        <Container>
            <Header>
                <LocationInputContainer />
            </Header>
        </Container>
    )

}

export default HeaderContainer