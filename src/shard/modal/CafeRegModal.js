import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { instance } from "../axios";
import { AiOutlineClose } from "react-icons/ai";

const CafeReg = (props) => {
  //modal
  const { open, close, header } = props;

  const [opened, setOpened] = useState(false);
  // 주소 모달창 여닫기
  // const modalClose = useCallback(() => {
  //   setOpened(!opened);
  // }, [opened]);
  const modalClose = () => {
    setOpened(!opened);
  };
  const role = localStorage.getItem("role");
  const cafename = localStorage.getItem("cafename");
  // console.log(cafename)

  //상세주소 입력값
  const Detail_Address = useRef(null);
  const Cafe_Name = useRef(null);

  // 주소 찾기 값 input에 전달
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState("");
  const [query, setQuery] = useState("");
  const { daum } = window;
  const onComplete = (data) => {
    setAddress(data.address);
    setOpened(false);
    Promise.resolve(data)
      .then((o) => {
        console.log(o);
        const { address } = data;
        const { zonecode } = data;
        const { query } = data;
        setZone(zonecode);
        setQuery(query);
        // console.log(address, zonecode, query);
        return new Promise((resolve, reject) => {
          const geocoder = new daum.maps.services.Geocoder();
          console.log(geocoder);
          geocoder.addressSearch(address, (result, status) => {
            if (status === daum.maps.services.Status.OK) {
              const { x, y } = result[0];
              resolve({ lat: y, lon: x });
            } else {
              reject();
            }
          });
        });
      })
      .then((result) => {
        console.log(result); // 위, 경도 결과 값
        const lat = result.lat;
        const lon = result.lon;
        setLatitude(lat);
        setLongitude(lon);
      });
    console.log(latitude, longitude, address, zone, query);
  };

  // window.setTimeout(() => {
  //   console.log(Detail_Address.current.value)
  //   console.log(latitude, longitude, address, zone, query)
  // }, 6000)

  const CafeAdd = async () => {
    if (role == "user" && !Cafe_Name.current.value) {
      return alert("카페명을 입력해주세요");
    } else if (!address || !zone) {
      return alert("우편주소를 입력해주세요");
    } else if (!Detail_Address.current.value) {
      return alert("상세주소를 입력해주세요");
    } else {
      try {
        if (role == "user") {
          const { data } = await instance.post("api/user/regist-cafe", {
            cafename: Cafe_Name.current.value,
            address: query,
            addressdetail: Detail_Address.current.value,
            zonenum: zone,
            latitude: latitude,
            longitude: longitude,
            // oldAddress: query
          });
          alert("등록이 완료되었습니다!");
          console.log(data);
        } else {
          console.log("사장 등록");
          const { data } = await instance.post("api/owner/regist-cafe", {
            address: query,
            addressdetail: Detail_Address.current.value,
            zonenum: zone,
            latitude: latitude,
            longitude: longitude,
            // oldAddress: query
          });
          alert("등록이 완료되었습니다!");
          // console.log(query);
          // console.log(data);
        }
        // console.log(data);
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    }
    close();
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <>
            <section style={{ overflowY: "scroll", overflowX: "hidden" }}>
              <div onClick={close}>
                <span>
                  <AiOutlineClose className="ExitBtnBlack" />
                </span>
              </div>

              <div className="CafeRegister">
                {role == "user" ? (
                  <div>
                    <p className="CafeHeader">
                      원하시는 카페를
                      <br />
                      신청해주세요!
                    </p>
                    <div className="UserCafeName">
                      <p>상호명</p>
                      <input
                        ref={Cafe_Name}
                        type="text"
                        placeholder="카페이름 + 지점명"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="CafeHeader">
                      사장님의 카페를
                      <br />
                      등록해주세요!
                    </p>
                    <div className="OwnerCafeName">
                      <p>상호명 : {cafename}</p>
                    </div>
                  </div>
                )}
                <div className="CafeAddress">
                  <p>우편번호 찾기</p>
                  <div>
                    <AdressBox
                      placeholder="우편번호"
                      name="address"
                      onChange={(e) => e.current.value}
                      value={zone}
                      required></AdressBox>
                    <AdrBtn
                      onClick={() => {
                        modalClose();
                      }}>
                      우편번호 찾기
                    </AdrBtn>
                  </div>
                  {opened ? (
                    <div>
                      <DaumPostCode
                        style={postCodeStyle}
                        onComplete={onComplete}
                      />
                    </div>
                  ) : null}
                  <InputBox
                    type="text"
                    placeholder="도로명 주소"
                    value={address}
                  />
                  <InputBox
                    ref={Detail_Address}
                    type="text"
                    placeholder="상세주소를 입력해주세요"
                  />
                </div>

                {role == "user" ? (
                  <div className="CafeNotice">
                    <span>
                      *카페는 관리자 승인 후 업로드 되며,
                      <br />
                      카페 승인은 최소 1시간 소요 될 수 있습니다.
                    </span>
                  </div>
                ) : (
                  <div className="CafeNotice">
                    <span>*자세한 정보는 마이 페이지에서 입력해주세요!</span>
                  </div>
                )}
              </div>
              <BtnBox>
                <BtnAdd
                  className="CafeUploadBtn"
                  onClick={() => {
                    CafeAdd();
                  }}>
                  카페신청하기
                </BtnAdd>
              </BtnBox>
            </section>
          </>
        ) : null}
      </div>
    </>
  );
};

//우편찾기
const postCodeStyle = {
  background: "white",
  width: "310px",
  height: "250px",
  border: "2px solid #d2d2d2",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  position: "inherit",
};

const Header = styled.header``;

const Body = styled.body``;

//우편번호 input
const AdressBox = styled.input`
  width: 160px;
  margin-bottom: 10px;
  border: 2px solid #f3eed9;
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  outline: none;

  font-family: "Arita-dotum-Light";
  color: #19221f;
  font-size: 16px;
  line-height: 16px;

  ::placeholder {
    color: #19221f;
    font-size: 16px;
    font-family: "Arita-dotum-Light";
  }
`;

//도로명 주소&상세주소 입력 input
const InputBox = styled.input`
  width: 290px;
  border: 2px solid #f3eed9;
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  outline: none;

  margin-bottom: 10px;

  font-family: "Arita-dotum-Light";
  color: #19221f;
  font-size: 16px;
  line-height: 16px;

  ::placeholder {
    color: #19221f;
    font-size: 16px;
    font-family: "Arita-dotum-Light";
  }
`;

//우편번호찾기 버튼
const AdrBtn = styled.button`
  width: 120px;
  height: 40px;
  margin: 0 0 10px 10px;
  background: #19221f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-size: 16px;
  color: white;
  font-family: "Arita-dotum-SemiBold";
`;

//카페 신청하기 버튼
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const BtnAdd = styled.button``;

export default CafeReg;
