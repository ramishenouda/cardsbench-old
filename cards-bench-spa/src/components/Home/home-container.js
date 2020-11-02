import React, { Component } from 'react';

import R1 from '../../assets/how-it-works-photos/R1.png';
import R2 from '../../assets/how-it-works-photos/R2.png';
import R3 from '../../assets/how-it-works-photos/R3.png';
import R4 from '../../assets/how-it-works-photos/R4.png';

import HomeView from './home-view'

class Home extends Component {
    render() {
        const photos = [R1, R2, R3, R4]

        return <HomeView sliderPhotos={photos}/>
    }
}

export default Home
