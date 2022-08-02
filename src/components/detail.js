import React, { useState } from "react";
import styled from "styled-components";
import DetailHome from "./DetailPages/DetailHome";
import DetailMenu from "./DetailPages/DetailMenu";
import DetailReview from "./DetailPages/DetailReview";
import ScrollBtn from "./ScrollBtn";
import ReviewBtn from "./ReviewBtn";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailCafeBanner } from "../redux/modules/AllSlice";
import DetailBanner from "./DetailPages/DetailBenner";

import "../css/Detail.css";

const Detail = () => {
  const parm = useParams();
  const dispatch = useDispatch();
  //parm에 카페아이디 주세요]
  React.useEffect(() => {
    dispatch(DetailCafeBanner(parm.id));
  }, [dispatch, parm.id]);

  const list = useSelector((state) => state.AllSlice.DetailCafeBanner);
 
  const [Menu, setMenu] = useState(parm["*"] === "review" ? "C" : "A");

  return (
    <>
      <DetailBanner image={list?.imageList} />
      {/*클릭 후에도 hover 값이 동일하게 적용되는게 필요합니다!!*/}
      <Container>
        <div className="CategoryTotal">
          <div className="Category">
            <a
              style={{ marginRight: "200px" }}
              onClick={() => {
                setMenu("A");
              }}>
              홈
            </a>
            <a
              style={{ marginRight: "200px" }}
              onClick={() => {
                setMenu("B");
              }}>
              메뉴
            </a>
            <a
              onClick={() => {
                setMenu("C");
              }}>
              리뷰
            </a>
          </div>

          <div className="CategoryLine"></div>
        </div>
      </Container>
      <div>
        {(Menu === "A" && <DetailHome cafeid={parm} />) ||
          (Menu === "B" && <DetailMenu cafeid={parm} />) ||
          (Menu === "C" && <DetailReview cafeid={parm} />)}
      </div>
      <ReviewBtn />
    </>
  );
};

const Container = styled.div``;

export default Detail;
