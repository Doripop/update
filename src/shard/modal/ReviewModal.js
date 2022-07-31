import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./modal.css";
import { instance } from "../axios";
import { AiOutlineClose } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ReviewCreate, ReviewReg } from "../../redux/modules/AllSlice";

const ReviewModal = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const [star, setStar] = useState(0);
  const review = useRef("");
  const formData = new FormData();

  React.useEffect(() => {
    dispatch(ReviewReg());
  }, [dispatch]);

  const CafeList = useSelector((state) => state.AllSlice.AutoCafeSearch);

  const [inputValue, setInputValue] = useState("");
  const [sendCafe, setSendCafe] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(CafeList?.data);
  // useState(wholeTextArray)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = CafeList?.data.filter((textItem) =>
        textItem.cafename.includes(inputValue)
      );

      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    console.log(clickedItem);
    setInputValue(`${clickedItem.cafe}:${clickedItem.address}`);
    setSendCafe({
      cafeid: clickedItem.cafeid,
      cafe: clickedItem.cafe,
      address: clickedItem.address,
    });
    setIsHaveInputValue(false);
  };
  //이부분이 보내는 부분 axios로 post 하기
  const handleDropDownKey = (e) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        e.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (e.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (e.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  React.useEffect(() => {
    showDropDownList();
  }, [inputValue]);
  // console.log(dropDownList);

  //Hashtag
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  // console.log(tagList);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(`#${tagItem}`);
    setTagList(updatedTagList);
    setTagItem("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  //imageUpload

  const [Upimage, setUpimage] = useState([]);
  const [orginImg, setOrginImg] = useState([]);
  // const formData = new FormData();

  const handleAddImages = (e) => {
    const imageLists = e.target.files;

    let imageUrlLists = [...Upimage];
    let OrignImage = [...orginImg];
    for (let i = 0; i < imageLists.length; i++) {
      OrignImage.push(imageLists[i]);
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);

      console.log(OrignImage, " 146");
      // formData.append("file", imageLists[i])
    }
    if (imageUrlLists.length > 3) {
      imageLists = imageLists.slice(0, 3);
    }

    setUpimage(imageUrlLists);
    setOrginImg(OrignImage);
  };

  // console.log(orginImg, "157 스테이트")

  const handleDeleteImage = (id) => {
    setUpimage(Upimage.filter((_, index) => index !== id));
  };

  const ReviewUpload = () => {
    const sendData = {
      star: star,
      hashtag: tagList,
      contents: review.current.value,
    };

    // console.log(sendImg)
    // for(let i = 0; i < Upimage.length; i++){
    //     formData.append("file", Upimage[i])
    // }
    // formData.append("file", [...Upimage])
    formData.append(
      "data",
      new Blob([JSON.stringify(sendData)], { type: "application/json" })
    );
    orginImg.forEach((file) => formData.append("files", file));
    // Upimage.forEach(image => formData.append("file",image))
    // console.log(Upimage)
    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }
    dispatch(
      ReviewCreate({
        formdata: formData,
        cafeid: sendCafe.cafeid,
      })
    );
  };

  // console.log(sendCafe.cafeid, star, tagList);

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <div onClick={close}>
              <AiOutlineClose className="ExitBtnBlack" />
            </div>
            <div className="ReviewHeader">
              <Title>
                원하시는 카페의 <br />
                리뷰를 작성해주세요
              </Title>
            </div>
            <div className="SearchCafe">
              <InputBox isHaveInputValue={isHaveInputValue}>
                <Search
                  type="search"
                  placeholder="카페 검색"
                  value={inputValue}
                  onChange={changeInputValue}
                  onKeyUp={handleDropDownKey}
                />
                <DeleteButton onClick={() => setInputValue("")}></DeleteButton>
              </InputBox>
            </div>

            {isHaveInputValue && (
              <DropDownBox>
                {dropDownList.length === 0 && (
                  <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
                )}
                {dropDownList.map((dropDownItem, dropDownIndex) => {
                  return (
                    <>
                      <DropDownItem
                        key={dropDownIndex}
                        onClick={() =>
                          clickDropDownItem({
                            cafeid: dropDownItem.cafeid,
                            cafe: dropDownItem.cafename,
                            address: dropDownItem.address,
                          })
                        }
                        onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                        className={
                          dropDownItemIndex === dropDownIndex ? "selected" : ""
                        }>
                        <span style={{ fontSize: "14px" }}>
                          {dropDownItem.cafename}
                        </span>
                        <br />
                        <span style={{ fontSize: "12px" }}>
                          {dropDownItem.address}
                        </span>
                      </DropDownItem>
                    </>
                  );
                })}
              </DropDownBox>
            )}
            <Body>
              <div>
                <div className="ReviewStarBox">
                  <span>별점</span>
                  <div className="ReviewStar">
                    {Array.from({ length: 5 }, (items, i) => (
                      <>
                        <span
                          onClick={() => {
                            setStar(i + 1);
                          }}>
                          {" "}
                          {star < i + 1 ? (
                            <BsStar
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "5px",
                              }}
                            />
                          ) : (
                            <BsStarFill
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "5px",
                              }}
                            />
                          )}
                        </span>
                      </>
                    ))}
                  </div>
                </div>

                <div className="ReviewHash">
                  <span>해시태그</span>
                  <div>
                    <Hashtag
                      type="text"
                      placeholder="태그 내용 입력 후 엔터를 눌러주세요!"
                      tabIndex={2}
                      onChange={(e) => setTagItem(e.target.value)}
                      onKeyPress={onKeyPress}
                      value={tagItem}
                    />
                    <TagBox>
                      {tagList.map((tagItem, index) => {
                        return (
                          <TagItem key={index}>
                            <Text>{tagItem}</Text>
                            <AiOutlineClose
                              className="ExitBtnGreen"
                              onClick={deleteTagItem}
                            />
                          </TagItem>
                        );
                      })}
                    </TagBox>
                  </div>
                </div>
                <div className="ReviewBox">
                  <span>리뷰</span>
                  <div>
                    <ReviewArea
                      ref={review}
                      placeholder="리뷰를 작성해주세요"
                    />
                  </div>
                </div>

                <div className="ImageDiv">
                  <span>리뷰 사진 업로드</span>

                  <div>
                    <div className="FileUpload">
                      <label htmlFor="input-file" onChange={handleAddImages}>
                        <input
                          type="file"
                          id="input-file"
                          // multiple
                        />
                      </label>
                    </div>

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
              </div>
            </Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <UploadBtn
                className="ReviewUploadBtn"
                onClick={() => {
                  ReviewUpload();
                }}>
                게시하기
              </UploadBtn>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
};
/// 자동완성 css
const InputBox = styled.div`
  width: 290px;
  height: 40px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;
const DropDownBox = styled.ul`
  width: 290px;
  display: block;
  margin: 5px auto;
  font-family: "Arita-dotum-Light";
  padding: 8px 0;
  background-color: white;
  border: 1px solid #f3eed9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  list-style-type: none;
  z-index: 3;
  border-radius: 3px;
`;

const DropDownItem = styled.li`
  padding: 10px;
  font-family: "Arita-dotum-Light";

  &.selected {
    background-color: #3fc275;
    color: white;
  }
`;

//해시태그
const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 0 10px;
  padding: 5px;
  border-radius: 100px;
  color: #3fc275;
  font-size: 12px;
  border: 1px solid #3fc275;
  font-family: "Arita-dotum-Light";
`;

const Text = styled.span`
  font-family: "Arita-dotum-Light";
  color: #3fc275;
  font-size: 12px;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Hashtag = styled.input`
  display: inline-flex;
  width: 290px;
  border: 2px solid #f3eed9;
  border-radius: 3px;
  padding: 10px;
  font-size: 16px;
  font-family: "Arita-dotum-Light";
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  cursor: text;
  ::placeholder {
    color: #19221f;
    font-size: 16px;
    font-family: "Arita-dotum-Light";
  }
`;

//////////////
const Title = styled.span``;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

//카페 검색 input
const Search = styled.input`
  width: 290px;
  height: 40px;
  border: none;
  font-size: 16px;
  line-height: 16px;
  font-family: "Arita-dotum-Medium";
  padding: 10px;
  color: #19221f;
  margin-bottom: 15px;
  ::placeholder {
    color: #19221f;
    font-size: 16px;
    font-family: "Arita-dotum-Medium";
  }
`;

//리뷰 입력
const ReviewArea = styled.textarea`
  width: 290px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid #f3eed9;
  border-radius: 3px;
  font-family: "Arita-dotum-Light";
  font-size: 16px;
  line-height: 16px;
  color: #19221f;
  padding: 10px;
  margin-top: 10px;
`;

const UploadBtn = styled.button``;

export default ReviewModal;
