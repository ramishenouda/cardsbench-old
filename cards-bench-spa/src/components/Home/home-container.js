import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import R1 from '../../assets/how-it-works-photos/R1.png';
import R2 from '../../assets/how-it-works-photos/R2.png';
import R3 from '../../assets/how-it-works-photos/R3.png';
import R4 from '../../assets/how-it-works-photos/R4.png';

import HomeView from './home-view'

class Home extends Component {
    state = {
        registering: false
    }

    register = () => {
        this.setState({ registering: true });
    }

    render() {
        const photos = [R1, R2, R3, R4]
        if (this.state.registering) {
            return <Redirect to="/register" />
        }

        return <HomeView sliderPhotos={photos} register={this.register} />
    }
}

export default Home
