import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
    };
    return (
        <div className={'image-slider'}>
            <Slider {...settings}>
                {[...Array(5).keys()].map((val) => {
                    return (<div className={'slider-cont'}>
                        <img className={'slider-img'}
                             src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}/>
                    </div>);
                })
                }
            </Slider>
        </div>
    );
};

export default ImageSlider;
