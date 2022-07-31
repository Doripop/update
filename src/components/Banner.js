//메인페이지 배너
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from './Button';

//Banner Img import
import BannerImg from '../css/BannerImg/service.jpg';
import BannerImg2 from '../css/BannerImg/survey.jpg';

const Banner = () => {
    const settings = {
        infinite: true,
        variableWidth: true,
        speed: 1000,
        slideToShow: 1,
        slideToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (

        <StyledSlider {...settings}>
            <div>
              <img src={BannerImg} alt='slider' />
            </div>
            <div>
              <img src={BannerImg2} alt='slider' />
            </div>
        </StyledSlider> 
      );
    }

const StyledSlider = styled(Slider)`
  //  //슬라이드 컨테이너 영역
   width: 100%;
   position: relative;
   height: 700px;  
   box-sizing: border-box;
   background-color: #19221F;
   
  .slick-list {  //슬라이드 스크린
    max-width: 100%;
    min-width: 100%;
    position: relative;
    // margin: 0 auto;
    background-repeat: no-repeat;
    background-size: contain;
    // background-position: 60% cover;
  }

  .slick-slide div { //슬라이더  컨텐츠
    width: fit-content;
    cursor: pointer;
    outline: none;
  }
`;

export default Banner;