import React from 'react';

import leftArrow from '../../assets/left-arrow.png';
import rightArrow from '../../assets/right-arrow.png';

import './slider-style.css';

function Slider(props) {
    return (
        <section className="Slider text-center">
            <div id="photos-container">
                <span onClick={props.previousPhoto} className="arrow left-arrow">
                    <img src={leftArrow} width='40vw' alt="" />
                </span>
                <img
                    onClick={props.nextPhoto}
                    src={props.photo}
                    alt=""
                    className="current-slider-photo"
                />
                <span onClick={props.nextPhoto} className="arrow right-arrow">
                    <img src={rightArrow} width='40vw' alt="" />
                </span>
            </div>
        </section>
    );
}

export default Slider;
