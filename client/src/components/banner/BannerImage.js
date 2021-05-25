import React from 'react';
import { Zoom } from 'react-slideshow-image';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import 'react-slideshow-image/dist/styles.css';
// import './banner.image.css'

const Banner = () => {
    const images = [
        `${banner1}`,
        `${banner2}`,
        `${banner3}`,
        // '../assets/images (1).jpg'
    ];

    const zoomOutProperties = {
        indicators: true,
        scale: 0.4,
    };
    return (
        <div ClassName='container'>
            <Zoom {...zoomOutProperties}>
                {images.map((each, index) => (
                    <div key={index} style={{ width: '100%' }}>
                        <img
                            style={{ width: '100%' }}
                            src={each}
                            alt='Banner'
                        />
                    </div>
                ))}
            </Zoom>
        </div>
    );
};

export default Banner;
