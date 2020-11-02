import React, { Component } from 'react';

import SliderView from './slider-view'

class Slider extends Component {
    state = {
        photos: [],
        currentPhoto: '',
        currentIndex: 0,
    }

    componentDidMount() {
        console.log(this.props.photos);
        if (this.props.photos) {
            this.setState({ photos: this.props.photos, currentPhoto: this.props.photos[0] });
        }

        window.addEventListener('resize', this.changeHeight);
        window.onload = this.changeHeight;
    }

    changeHeight = () => {
        const photosContainer = document.getElementById('photos-container');
        const currentSliderPhoto = document.querySelector('.current-slider-photo');
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');

        leftArrow.style.left = ((photosContainer.clientWidth - currentSliderPhoto.clientWidth) / 2) + 'px';
        rightArrow.style.right = ((photosContainer.clientWidth - currentSliderPhoto.clientWidth) / 2) + 'px';
    }

    nextPhoto = () => {
        this.setState(prevState => {
            prevState.currentIndex = (prevState.currentIndex + 1) % prevState.photos.length;
            prevState.currentPhoto = prevState.photos[prevState.currentIndex];

            return prevState;
        })
    }

    previousPhoto = () => {
        this.setState(prevState => {
            prevState.currentIndex = (prevState.currentIndex - 1 + prevState.photos.length) % prevState.photos.length;
            prevState.currentPhoto = prevState.photos[prevState.currentIndex];

            return prevState;
        })
    }

    render() {
        return (
            <SliderView 
                previousPhoto={this.previousPhoto}
                nextPhoto={this.nextPhoto}
                photo={this.state.currentPhoto}
            />
        );
    }
}

export default Slider;
