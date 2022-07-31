import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { BiMap } from "react-icons/bi";
import { AiFillSound } from "react-icons/ai";
import { MdDeliveryDining } from "react-icons/md";
import { GiShop } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";

import { DetailCafeHome } from "../../redux/modules/AllSlice";
import { useParams } from "react-router-dom";

import "../../css/partCss/DetailHome.css";

const DetailHome = () => {
  const dispatch = useDispatch();
  const parm = useParams();
  console.log(parm);

  //카페정보
  const OwnerInfoList = useSelector((state) => state.MypageSlice.OwnerInfo);
  console.log(OwnerInfoList);

  const home = useSelector((state) => state.AllSlice.DetailCafeList);
  console.log(home);

  React.useEffect(() => {
    //메뉴 정보 받아오기
    dispatch(DetailCafeHome(parm.id));
    //이부분은 그냥 카페아이디 파람으로 넘길곳
  }, [dispatch]);

  //지도 테스트
  const options = {
    center: new window.kakao.maps.LatLng(home?.latitude, home?.longitude),
    level: 3,
  };

  const container = useRef(null);

  React.useEffect(() => {
    const map = new window.kakao.maps.Map(container.current, options);
    const markerPosition = new window.kakao.maps.LatLng(
      home?.latitude,
      home?.longitude
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [home?.latitude, home?.longitude, options]);

  return (
    <>
      <div className="CafeDetailHome">
        <div>
          {OwnerInfoList?.dilivery ? (
            <div className="Delivery">
              <MdDeliveryDining className="IconMd" />
              <p>배달 가능 매장입니다!</p>
            </div>
          ) : (
            <div className="Delivery">
              <GiShop className="IconShop" />
              <p>매장만 이용 가능합니다!</p>
            </div>
          )}
        </div>
        <div className="CafeHr"></div>
        <div id={home?.cafeid} className="CafeDetail">
          <p>가게 설명</p>
          <div>{home?.intro}</div>
        </div>
        <div className="CafeHr"></div>
        <div className="CafeNotice">
          <div>
            <AiFillSound className="Sound" />
            <p>사장님이 안내 드립니다!</p>
          </div>

          <p>{home?.notice}</p>
        </div>
        <div className="CafeHr"></div>
        <div className="CafeMap">
          <div>
            <BiMap className="CafeMapIcon" />
            <div className="CafeMapAddress">
              {home?.address}
              {home?.addressdetail}&nbsp;
              {home?.zonenum} <br />
            </div>
          </div>

          <div className="map" ref={container}></div>
        </div>
      </div>
    </>
  );
};

export default DetailHome;
