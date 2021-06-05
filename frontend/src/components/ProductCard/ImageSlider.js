import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageLoader from "../ImageLoader/ImageLoader";

const ImageSlider = ({images}) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        arrows: false,
    };
    return (
        <div className={'image-slider'}>
            <Slider {...settings}>
                {images.map((image, index) => {
                    return (<div key={'imageSLIDER_'+index} className={'slider-cont'}>
                        <ImageLoader className={'slider-img'}
                             src={image}/>
                    </div>);
                })
                }
            </Slider>
        </div>
    );
};

export default ImageSlider;
