import React from 'react';

import Slider from '../slider/slider-container';
import R5 from '../../assets/how-it-works-photos/hero-a.svg';
import Email from '../../assets/email.webp';
import GitHub from '../../assets/github.png';
import Linkedin from '../../assets/linkedin.png';

import './home-styles.css'

function HomeView(props) {
    const smallScreen = window.innerWidth < 721;

    return (
        <span className="home">
            <header className="main-header">
                <div className="main-header-content ml-2 mr-2">
                    <div className={`row mx-auto ${smallScreen ? 'pt-1': 'pt-5'}`}>
                        <div className={`col-sm ${smallScreen ? 'pt-1': 'pt-5'}`}>
                            <h1>
                                CardsBench will help you to work with your team and get more done.
                            </h1>
                            <h5>
                                CardsBench’s boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.
                            </h5>
                        </div>
                        <div className="col-sm">
                            <img 
                                className="responsive-photo" 
                                src={R5} 
                                alt="" 
                            />
                        </div>
                    </div>
                    <div className="row mx-auto mt-4 mb-3">
                        <div className={`col-sm ${smallScreen ? 'text-center': 'text-left'}`}>
                            <span className="button button-success">Register</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="main mt-4 text-center">
                <section className="how-it-works pb-2 col-sm">
                    <h1>How it works</h1>
                    <hr style={{width: '240px'}} />
                    <Slider photos={props.sliderPhotos} />
                </section>
                <section className="contact mt-3 section mb-5" id="contact">
                    <h3>CONTACT THE DEVELOPER</h3>
                    <hr style={{width: '260px'}} />
                    <div className="contact-info">
                        <div className="row mx-auto mt-5">
                            <a className="col-sm-4 mb-4 contact-link" href="mailto:ramishenouda@outlook.com">
                                <img alt="" src={Email} width="100px" />
                            </a>
                            <a className="col-sm-4 mb-4 contact-link" rel="noopener noreferrer" target="_blank" href="https://github.com/ramishenouda">
                                <img alt="" src={GitHub} width="100px" />
                            </a>
                            <a className="col-sm-4 mb-4 contact-link" rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/ramishenouda/">
                                <img alt="" src={Linkedin} width="100px" />
                            </a>
                        </div>
                    </div>
                </section>
            </main>  
        </span>
    );
}

export default HomeView