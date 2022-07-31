import React, { useRef } from "react";
import styled from "styled-components";
import "./modal.css";
import { instance } from "../axios";
import { AiOutlineClose } from "react-icons/ai";

//google, naver, kakao login import
import NaverLogin from "react-naver-login";
import KakaoLogin from "react-kakao-login";
import GoogleLogin from "react-google-login";

//Image import

import backImg1 from "../../css/cafeImg/cafeImg1.jpg";
import backImg2 from "../../css/cafeImg/cafeImg2.jpg";
import backImg3 from "../../css/cafeImg/cafeImg3.jpg";
import backImg4 from "../../css/cafeImg/cafeImg4.jpg";
import kakaoImg from "../../css/kakao_login_large_narrow.png";
import googleImg from "../../css/btn_google_signin_dark_normal_web2x.png";
import naverImg from "../../css/btnG_official.png";
import Logo_Cat from "../../css/Logo_Cat_lattee.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiBorderRadius } from "react-icons/bi";

const LoginModal = (props) => {
  const navigate = useNavigate();
  const userID = useRef("");
  const userPW = useRef("");
  const { open, close } = props;

  //카카오
  const KAKAO_AUTH_URL =
    "https://kauth.kakao.com/oauth/authorize?client_id=0fad600f70237d21a6baebc379896fbd&redirect_uri=https://kyuhong.shop/api/oauth2/kakao&response_type=code";
  const kakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  //네이버
  const Naver_AUTH_URL =
    "http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=qF6prEII7uI4LdzuKI5V&state=onechild&redirect_uri=https://kyuhong.shop/api/naver/auth";
  const naver = () => {
    window.location.href = Naver_AUTH_URL;
  };
  //구글
  const Google_AUTH_URL = "https://kyuhong.shop/api/google/login";
  const google = () => {
    window.location.href = Google_AUTH_URL;
  };
  //Image array
  const backgroundArr = [backImg1, backImg2, backImg3, backImg4];
  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundImg = backgroundArr[randomIndex];

  const userLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://kyuhong.shop/api/user/signin",
        {
          email: userID.current.value,
          password: userPW.current.value,
        }
      );
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refreshtoken", data.data.refreshToken);
      localStorage.setItem("nicname", data.data.nickname);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("profileimg", data.data.profileimg);
      localStorage.setItem("logoimg", data.data.logoimg);
      localStorage.setItem("cafename", data.data.businessname);
      console.log(data);
      return data.data.role === "admin"
        ? window.location.replace("/admin")
        : data.result
        ? window.location.replace("/")
        : close();
    } catch (error) {
      // eslint-disable-next-line default-case
      switch (error.response.data.message) {
        case "아이디 혹은 비밀번호가 틀렸습니다.":
          alert("아이디 혹은 비밀번호가 틀렸습니다.");
          break;
      }
    }
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section
            className="modalBackImg"
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}>
            <div onClick={close}>
              <span>
                <AiOutlineClose className="ExitBtnWhite" />
              </span>
            </div>
            <Header>
              <div className="ModalHeaderLogin">
                <img className="logoImg" src={Logo_Cat} />
                <p>BLANK</p>
              </div>
            </Header>
            <Body>
              <div className="LoginInput">
                <InputBox ref={userID} type="email" placeholder="E-mail" />
              </div>
              <div className="LoginInput">
                <InputBox ref={userPW} type="password" placeholder="Password" />
              </div>
            </Body>
            <Footer>
              <div className="SnsBtnTotal">
                <Fbutton
                  className="SnsBtn"
                  onClick={userLogin}
                  style={{
                    backgroundColor: "#19221f",
                  }}>
                  Log in
                </Fbutton>
                {/* 카카오톡 로그인 */}
                <AuthBtn
                  className="SnsBtn"
                  style={{ backgroundColor: "#FEE500", color: "#19221f" }}
                  onClick={() => {
                    kakao();
                  }}>
                  Kakao Log in
                </AuthBtn>
                {/* 네이버 로그인 */}
                <AuthBtn
                  className="SnsBtn"
                  style={{ backgroundColor: "#03c75a" }}
                  onClick={() => {
                    naver();
                  }}>
                  Naver Log in
                </AuthBtn>
                {/* 구글 로그인 */}
                <AuthBtn
                  className="SnsBtn"
                  style={{ backgroundColor: "#4285F4" }}
                  onClick={() => {
                    google();
                  }}>
                  Google Log in
                </AuthBtn>
              </div>
            </Footer>
          </section>
        ) : null}
      </div>
    </>
  );
};

const Header = styled.header``;

const Body = styled.body``;

const InputBox = styled.input``;

const Img_sns = styled.img``;

const Footer = styled.footer``;

const Fbutton = styled.button``;

const AuthBtn = styled.button``;

export default LoginModal;
