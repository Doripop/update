import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import "./modal.css";
import Logo_Cat from "../../css/Logo_Cat_lattee.png";
import lock_Img from "../../shard/modal/modalmg/lock.png";
import { instance } from "../axios";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";

const SignupModal = (props) => {
  const { open, close } = props;

  //입력받을 값
  const Nic = useRef("");
  const Email = useRef("");
  const Password = useRef("");
  const Check = useRef("");
  const Businessname = useRef("");
  const Businessnumber = useRef("");
  const Userfile = useRef("");
  const Businessfile = useRef("");
  const [role, setRole] = useState("user");

  //이메일, 닉네임, 비밀번호 정규표현식
  // const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const reg_email = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const reg_nic = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{3,9}$/;
  const reg_pass = /^[0-9a-zA-Z!@#$%^&.*]{8,20}$/;

  //유효성 알림
  const [signNicAlert, setSignNicAlert] = useState("");
  const [signEmailAlert, setSignEmailAlert] = useState("");
  const [signPassAlert, setSignPassAlert] = useState("");
  const [signCheckAlert, setSignCheckAlert] = useState("");

  //사업자 등록 번호 하이픈 자동 추가(숫자만 작성가능)
  const onBusinessChange = () => {
    const bussnum = Businessnumber.current.value.replace(/\D+/g, "");
    const numberLength = 10;

    let result;
    result = "";

    for (let i = 0; i < bussnum.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;

        case 5:
          result += "-";
          break;

        default:
          break;
      }
      result += bussnum[i];
    }
    Businessnumber.current.value = result;
  };

  // 닉네임 형식 체크
  const onNicChange = () => {
    const nic = Nic.current.value;
    if (reg_nic.test(nic)) {
      setSignNicAlert("");
    } else {
      setSignNicAlert("닉네임은 3~9글자,국문,영문,숫자로 작성해주세요.");
    }
  };

  // 이메일 형식 체크
  const onEmailChange = () => {
    const email = Email.current.value;
    if (reg_email.test(email)) {
      setSignEmailAlert("");
    } else {
      setSignEmailAlert("이메일 형식으로 작성해주세요.");
    }
  };

  // 비밀번호 형식 체크
  const onPassChange = () => {
    const pass = Password.current.value;
    if (reg_pass.test(pass)) {
      if (pass.search(/\s/) !== -1) {
        setSignPassAlert("공백 없이 작성해주세요.");
      } else {
        setSignPassAlert("");
      }
    } else {
      setSignPassAlert(
        "영문,숫자 특수문자!@#$%^&를 포함한 8 이상으로 작성해주세요."
      );
    }
  };
  // 비밀번호 확인 형식 체크
  const onPassCheckChange = () => {
    const pass = Password.current.value;
    const passCheck = Check.current.value;
    if (passCheck === pass) {
      setSignCheckAlert("");
    } else {
      setSignCheckAlert("비밀번호가 일치하지 않습니다.");
    }
  };

  const userRole = (e) => {
    setRole(e.target.value);
  };

  const NumberCheck = (e) => {
    const Rule = [];
    const justNumber = e.split("-");
    const CheckRule = justNumber.map((item, i) => {
      Rule.push(item.length);
    });

    const BusinessCheck = e
      .replace(/-/gi, "")
      .split("")
      .map(function (item) {
        return parseInt(item, 10);
      });
    if (Rule[0] !== 3 || Rule[1] !== 2 || Rule[2] !== 5) {
      return false;
    } else if (BusinessCheck.includes(NaN)) {
      return false;
    } else if (BusinessCheck.length === 10) {
      let Arr = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5);
      let checkSum = 0;
      for (let i = 0; i < Arr.length; i++) {
        checkSum += Arr[i] * BusinessCheck[i];
      }
      checkSum += parseInt(((Arr[8] * BusinessCheck[8]) / 10, 10));
      Math.floor(BusinessCheck[9] === 10 - (checkSum % 10));
      return true;
    }
    return false;
  };

  async function userRegister() {
    if (
      !Nic.current.value ||
      !Email.current.value ||
      !Password.current.value ||
      !Check.current.value
    ) {
      window.alert("모두 입력해주세요");
    } else if (!reg_email.test(Email.current.value)) {
      return alert("이메일 형식을 지켜주세요!");
    } else if (
      role == "owner" &&
      NumberCheck(Businessnumber.current.value) == false
    ) {
      return alert("사업자 등록번호 형식이 아닙니다!");
    } else if (Password.current.value !== Check.current.value) {
      return alert("비밀번호가 일치하지 않아요!");
    } else if (role == "owner" && !Businessnumber.current.value) {
      return alert("<필수> 사업자등록번호를 입력하세요");
    } else if (role == "owner" && !Businessname.current.value) {
      return alert("<필수> 상호명을 입력하세요");
    } else {
      console.log("회원가입 요청");
      try {
        //   console.log(Upimage[0])
        const formdata = new FormData();
        const Data = {
          role: role,
          email: Email.current.value,
          password: Password.current.value,
          nickname: Nic.current.value,
          businessnum: role == "user" ? "" : Businessnumber.current.value,
          businessname: role == "user" ? "" : Businessname.current.value,
        };
        formdata.append("file", image);

        formdata.append(
          "data",
          new Blob([JSON.stringify(Data)], { type: "application/json" })
        );
        // for (let value of formdata.values()) {
        //     console.log(value);
        // }
        if (!image) {
          const { data } = await axios.post(
            "https://kyuhong.shop/api/user/signup",
            Data
          );
          alert("회원가입이 완료되었습니다");
          return data.result ? close() : null;
        } else {
          const { data } = await axios.post(
            "https://kyuhong.shop/api/user/signup-image",
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          alert("회원가입이 완료되었습니다");
          return data.result ? close() : null;
        }
        // close();
      } catch (error) {
        // eslint-disable-next-line default-case
        switch (error.response.data.message) {
          case "이메일이 중복되었습니다.":
            alert("이메일이 중복되었습니다.");
            break;
          case "닉네임이 중복되었습니다.":
            alert("닉네임이 중복되었습니다.");
            break;
        }
      }
    }
  }

  //imageUpload
  const [Upimage, setUpimage] = useState([]);
  const [image, setImage] = useState(undefined);
  const handleAddImages = (e) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...Upimage];
    setImage(e.target.files[0]);
    // console.log(imageLists);

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
      /////
      // console.log(imageLists[i])
      // formData.append("file", imageLists[i])
    }
    if (imageUrlLists.length > 1) {
      imageLists = imageLists.slice(0, 1);
    }
    setUpimage(imageUrlLists);
  };
  //멀티 이미지 지우기
  const handleDeleteImage = (id) => {
    setUpimage(Upimage.filter((_, index) => index !== id));
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <div onClick={close}>
              <span>
                <AiOutlineClose className="ExitBtnBlack" />
              </span>
            </div>
            <Header>
              <div className="ModalHeaderSignup">BLANK 회원가입</div>
            </Header>
            <Body>
              <RadioGroup className="CheckBoxTotal">
                <div className="CheckBox">
                  <input
                    type="radio"
                    id="사용자"
                    name="구분"
                    value="user"
                    onChange={(e) => {
                      userRole(e);
                    }}
                  />
                  <label>사용자</label>
                </div>
                <div className="CheckBox">
                  <input
                    type="radio"
                    id="사장님"
                    name="구분"
                    value="owner"
                    onChange={(e) => {
                      userRole(e);
                    }}
                  />
                  <label>사장님</label>
                </div>
              </RadioGroup>
              <RadioBtn className={role == "user" ? "user" : "owner"}>
                <div className="OwnerInput">
                  <InputBox
                    ref={Businessname}
                    type="text"
                    placeholder="상호명을 입력해주세요"
                  />
                  <InputBox
                    ref={Businessnumber}
                    type="text"
                    placeholder="사업자등록번호"
                    onChange={onBusinessChange}
                  />
                </div>
              </RadioBtn>

              <div className="UserInput">
                <div>
                  <InputBox
                    ref={Nic}
                    type="text"
                    placeholder="닉네임"
                    onChange={onNicChange}
                  />
                  <p className="ErrorMessage">{signNicAlert}</p>
                </div>
                <div>
                  <InputBox
                    ref={Email}
                    type="email"
                    placeholder="이메일"
                    onChange={onEmailChange}
                  />
                  <p className="ErrorMessage">{signEmailAlert}</p>
                </div>
                <div className="UserInputLock">
                  <div>
                    <InputBox
                      ref={Password}
                      type="password"
                      placeholder="비밀번호"
                      onChange={onPassChange}></InputBox>
                  </div>

                  <p className="ErrorMessage">{signPassAlert}</p>
                </div>
                <div className="UserInputLock">
                  <div>
                    <InputBox
                      ref={Check}
                      type="password"
                      placeholder="비밀번호 확인"
                      onChange={onPassCheckChange}></InputBox>
                  </div>

                  <p className="ErrorMessage">{signCheckAlert}</p>
                </div>
              </div>

              {/* 로고/프로필 이미지 업로드 시작 */}
              <div className="ImageDiv">
                <div className={role === "user" ? "user" : "owner"}>
                  <span>로고 사진 업로드</span>
                </div>
                <div className={role === "owner" ? "user" : "owner"}>
                  <span>프로필 사진 업로드</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}>
                  <div className="FileUpload">
                    <label htmlFor="input-file" onChange={handleAddImages}>
                      <input type="file" id="input-file" />
                    </label>
                  </div>
                  {/* 로고/프로필 미리보기 삭제 필요 */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}>
                    {Upimage.map((image, i) => (
                      <div key={i}>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={image}
                          alt={`${image}-${i}`}
                          onClick={() => handleDeleteImage(i)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* 로고/프로필 이미지 업로드 끝 */}
            </Body>
            <Footer>
              <button
                className="SignBtn"
                onClick={() => {
                  userRegister();
                }}>
                가입하기
              </button>
            </Footer>
          </section>
        ) : null}
      </div>
    </>
  );
};

const Header = styled.header``;

const Body = styled.body``;

const RadioGroup = styled.div``;

const RadioBtn = styled.div``;

const FormCheckText = styled.label``;

const InputBox = styled.input`
  //살릴 것
  color: #19221f;
  font-family: "Arita-dotum-Medium";
  font-size: 16px;
  padding-left: 10px;
`;

const LockIcon = styled.span`
  margin: 0px;
  padding: -10px;
  margin-left: -20px;

  .lock {
    position: relative;
    color: #19221f;
    font-size: 20px;
  }
`;

const Footer = styled.footer`
  display: flex;
  width: fit-content;
  margin: auto;
`;

export default SignupModal;
