import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

export default function MySlider(props) {
    const { images } = props;
    const navigate = useNavigate();
    let style = {
        borderRadius: "7px",
    };

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        wariableWidth: true,
    };

    if (!images) return null;

    return (
        <div>
            <Slider {...settings}>
                {images.map((image) => {
                    return (
                        <img
                            style={style}
                            src={image?.url}
                            alt={image?.name}
                            onClick={() => navigate("/tagging/" + image._id)}
                        />
                    );
                })}
            </Slider>
        </div>
    );
}
