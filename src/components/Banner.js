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
import BannerImg3 from '../css/BannerImg/banner3.jpeg'

const Banner = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (

    <StyledSlider {...settings}>



      <div
      style={{
        backgroundColor:"#F3EED9"
      }}>
        <img
          src={BannerImg} alt='slider' />
      </div>

      <div
      style={{
        backgroundColor:"#19221f"
      }}>
        <img
          onClick={() => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSe1f0SYJUb6mxFJi08aqGai6w0m6fQyOm9oQINj6UAMcFlhSw/viewform', "_blank")
          }}
          src={BannerImg3}
          alt='slider' />
      </div>


    </StyledSlider>
  );
}

const StyledSlider = styled(Slider)`
  //  //슬라이드 컨테이너 영역
  all: unset;
   position: relative;
   height: 700px;  
   box-sizing: border-box;

  .slick-list {  //슬라이드 스크린

  }

  .slick-slide div { //슬라이더  컨텐츠
    cursor: pointer;
 
    // outline: none;
  }

  

`;

export default Banner;