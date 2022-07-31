import React, { useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { FaComment } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  ApplyLike,
  CreateComment,
  DeleteMyComment,
  DeletePost,
  DetailCafeBanner,
  DetailCafePost,
  LikeCountAdd,
  LikeCountMinus,
  ModifyMyCommnet,
} from "../../redux/modules/AllSlice";
import { useParams } from "react-router-dom";
import { instance } from "../../shard/axios";
import { LikeInfoLoad, LikeList, UnLikeList } from "../../redux/modules/Likes";
import { BsStarFill, BsHeart, BsHeartFill } from "react-icons/bs";

import "../../css/partCss/Review.css";

const DetailReview = () => {
  const parm = useParams();
  const [userName, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [Like, setLike] = useState([]);
  const dispatch = useDispatch();
  //정렬하기
  const [sort, setSort] = useState("star");
  const [comment, setComment] = useState("");

  React.useEffect(() => {
    setUsername(localStorage.getItem("nicname"));
    setIsLogin(localStorage.getItem("token"));
    dispatch(LikeInfoLoad(parm.id));
    dispatch(DetailCafeBanner(parm.id));
    dispatch(
      DetailCafePost({
        id: parm.id,
        sort: sort,
      })
    );
    setLike(AllLikeList);
  }, [dispatch, Like, sort, parm.id]);

  const AllLikeList = useSelector((state) => state.Likes.LikeInfo);
  const review = useSelector((state) => state.AllSlice.DetailCafePostList);
  console.log(AllLikeList);
  console.log(review, "지금필요한게 이거");

  const LikeIndex = review?.map((item, i) => {
    return AllLikeList?.findIndex((list, k) => {
      return item.postid === list.postid;
    });
  });
  console.log(LikeIndex);
  // const LikeIndex = review.findIndex((list,i)=>{
  //     AllLikeList.map((item,i)=>{
  //         return list.postid === item.postid
  //     })
  // })

  // console.log(review)
  // console.log(Like)

  const [unclick, setUnclick] = useState("none");
  const [click, setClick] = useState("flex");
  const clickevent = () => {
    setClick("none");
    setUnclick("flex");
  };
  const unclickevent = () => {
    setClick("flex");
    setUnclick("none");
  };

  const nickname = useRef(null);
  const contents = useRef(null);

  // const changeCom = () => {
  //     dispatch(CreateComment(contents.current.value))
  // }

  const keyPress = (e, id) => {
    if (e.key === "Enter") {
      dispatch(
        CreateComment({
          contents: comment,
          postid: id,
          nickname: localStorage.getItem("nicname"),
          profileimg: localStorage.getItem("profileimg"),
        })
      );
    }
  };

  // 댓글 수정
  const [ChangeReview, setChangeReview] = useState("");
  const ModifyComment = (e) => {
    setChangeReview(e.target.value);
  };
  const SendModify = (commentid, postid, contents) => {
    dispatch(
      ModifyMyCommnet({
        commentid: commentid,
        contents: contents,
        nickname: localStorage.getItem("nicname"),
        profileimg: localStorage.getItem("profileimg"),
        postid: postid,
      })
    );
  };

  //댓글 삭제
  const SendDelete = (commentid, postid) => {
    // console.log(commentid)
    dispatch(
      DeleteMyComment({
        commentid: commentid,
        postid: postid,
      })
    );
  };
  //좋아요 기능

  const LikeClick = async (postid) => {
    console.log(postid);
    const A = AllLikeList.findIndex((list) => {
      return list.postid === postid.postid;
    });
    console.log(A);
    if (!isLogin) {
      return window.alert("로그인 후 이용해주세요!");
    } else if (
      AllLikeList[A]?.postid === postid.postid &&
      AllLikeList[A]?.like === false
    ) {
      console.log("실행");
      const { data } = await instance.post(`api/${postid.postid}/like`);
      console.log(data);
      dispatch(
        LikeList({
          postid: postid.postid,
          like: data.result,
        })
      );
      //test
      dispatch(
        LikeCountAdd({
          postid: postid.postid,
        })
      );
      //test
    } else if (
      AllLikeList[A]?.postid === postid.postid &&
      AllLikeList[A]?.like === true
    ) {
      const { data } = await instance.post(`api/${postid.postid}/like`);
      console.log(data);
      dispatch(
        UnLikeList({
          postid: postid.postid,
          like: data.result,
        })
      );
      //test
      dispatch(
        LikeCountMinus({
          postid: postid.postid,
        })
      );
      //test
    } else {
      window.alert("유효하지 않은 요청입니다.");
    }
  };

  // 이미지슬라이드 설정값
  const settings = {
    slideToShow: 1,
    variableWidth: true,

    // variableWidth: true,
    // slideToScroll: 15,
    // nextArrow: <Button place="right" margin="0 0 0 590px" />,
    // prevArrow: <Button margin="0 0 0 -590px" />,
  };

  return (
    <>
      <div className="ReviewTotal">
        <div className="AlignmentDiv">
          <div
            className="AlignBtn"
            style={{ marginRight: "15px" }}
            onClick={() => {
              setSort("star");
            }}>
            별점순
          </div>
          <div
            className="AlignBtn"
            onClick={() => {
              setSort("like");
            }}>
            좋아요순
          </div>
        </div>

        <div className="detailContainer">
          {review?.map((item, i) => (
            <div className="detailReviewDiv" key={item.postid}>
              <div className="reviewHeader">
                <img className="reviewProfile" src={item.profileimg} />
                <div className="nickname">{item.nickname}</div>
              </div>
              {/* {userName === item.nickname ?
                        (
                            <ReviewDrop>
                                <ul className="dep1">
                                    <li>
                                        ⋯
                                        <ul className="dep2">
                                            <li
                                                onClick={() => {
                                                    dispatch(DeletePost(item.postid))
                                                }}
                                            >
                                                삭제하기
                                            </li>
                                            <li
                                                onClick={() => {
                                                    dispatch(DeletePost({
                                                        postid: item.postid,
                                                        // 인풋 값 받아서 수정
                                                    }))
                                                }}
                                            >수정하기
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </ReviewDrop>

                        ) : (null)} */}
              {/* 게시글 이미지 슬라이드 */}
              <div className="imageContainer">
                <StyledSlider className="imageSlider" {...settings}>
                  {item.image.map((item, i) => (
                    <>
                      <div className="reviewImgDiv">
                        <img src={item.img} alt="slider" />
                      </div>
                    </>
                  ))}
                </StyledSlider>
              </div>

              {/* <ReviewImg src={item.image[0].img} /> */}

              <ReviewStarLove>
                <div className="like-starDiv">
                  <BsStarFill className="star" />{" "}
                  <div className="text">별점 {item.star}점</div>
                  <span
                    className="like"
                    onClick={() => {
                      LikeClick({ postid: review[i]?.postid, i: i });
                    }}>
                    {AllLikeList[LikeIndex[i]]?.postid === review[i]?.postid &&
                    AllLikeList[LikeIndex[i]]?.like ? (
                      <BsHeartFill />
                    ) : (
                      <BsHeart />
                    )}
                  </span>
                  <div className="text">좋아요 {item.likecnt}개</div>
                </div>
              </ReviewStarLove>

              <ReviewUserInfo>{item.nickname}</ReviewUserInfo>
              <Tag>
                {item.hashtagList.map((t, i) => (
                  <ReviewTag>{t.hashtag}</ReviewTag>
                ))}
              </Tag>
              <ReviewContext>{item.contents}</ReviewContext>
              <ReviewCommentGroup>
                {comment != item.commentList ? (
                  <details>
                    <summary>댓글 {item.commentCnt}개 모두 보기</summary>
                    <ReviewDate>{item.modifiedAt}</ReviewDate>
                    <ReviewComUp>
                      {item.commentList.map((comment, i) => (
                        <>
                          <div>
                            {userName === comment.nickname ? (
                              <span style={{ display: "flex" }}>
                                <ReviewProfile src={comment.profileimg} />
                                {comment.nickname}
                                {comment.contents}
                                <Btn
                                  style={{ display: click }}
                                  onClick={() => {
                                    clickevent();
                                  }}>
                                  🖊
                                </Btn>
                                <input
                                  onChange={(e) => {
                                    ModifyComment(e);
                                  }}
                                  type="text"
                                  style={{ display: unclick }}
                                />
                                <Btn
                                  style={{ display: unclick }}
                                  onClick={() => {
                                    unclickevent();
                                    // changeCom();
                                    SendModify(
                                      comment.commentid,
                                      item.postid,
                                      ChangeReview
                                    );
                                  }}>
                                  🖊
                                </Btn>
                                <Btn
                                  onClick={() => {
                                    SendDelete(comment.commentid, item.postid);
                                  }}>
                                  ⨉
                                </Btn>
                              </span>
                            ) : (
                              <span style={{ display: "flex" }}>
                                <ReviewProfile src={comment.profileimg} />
                                {comment.nickname} : {comment.contents}
                                {comment.modifiedAt}
                              </span>
                            )}
                          </div>
                        </>
                      ))}
                    </ReviewComUp>
                  </details>
                ) : (
                  <summary></summary>
                )}
              </ReviewCommentGroup>
              <ReviewComment>
                <input
                  type="text"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder="댓글달기"
                  onKeyPress={(e) => {
                    keyPress(e, item.postid);
                  }}
                />
              </ReviewComment>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const StyledSlider = styled(Slider)``;

const ReviewContent = styled.div``;

const Alignment = styled.div``;

const AlignBtn = styled.button``;

const Review = styled.div`
  position: relative;
  margin: 29px auto 20px auto;

  border: 1px solid #d9d9d9;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewHeader = styled.div``;

const ReviewDrop = styled.div`
  // margin: 0 auto;
  // padding: 0 auto;
  position: relative;
  & ul,
  li {
    list-style: none;
  }

  .dep2 > li {
    width: 100px;
    height: 20px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }

  .dep1 > li {
    display: block;
    cursor: pointer;
  }

  .dep1 > li:hover > .dep2 {
    display: block;
  }

  .dep2 {
    display: none;
  }
`;

const ReviewImg = styled.img`
  width: 500px;
  height: 500px;
`;

const ReviewStarLove = styled.div`
  // width: 500px;
  // height: 24px;
  // margin-left: 20px;
  // margin-bottom: 10px;
`;

const ReviewUserInfo = styled.div`
  width: 500px;
  height: 20px;
  margin-left: 20px;
  font-size: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const Tag = styled.div`
  position: relative;
  margin-left: 18px;
  width: 500px;
`;

const ReviewTag = styled.div`
  width: 500px;
  height: 20px;
  margin-left: 10px;
  padding: -10px;
  display: contents;
`;

const ReviewContext = styled.div`
  width: 480px;
  margin-top: 10px;
`;

const ReviewCommentGroup = styled.div`
  position: relative;
  width: 400px;
  margin: 0 auto;
  color: gray;
  margin-left: -20px;

  details {
    font: 16px "Open Sans", sans-serif;
    float: left;
    padding: 0.5em 0.5em 0;
  }

  summary {
    margin-left: 20px;
    cursor: pointer;
    list-style: none;
    font-family: "Arita-dotum4.0(OTF)";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    margin-top: 15px;
  }
`;

const ReviewComUp = styled.div`
  width: 500px;
  margin-left: 20px;
  line-height: 2;
  color: gray;

  input {
    position: relative;
    margin-left: 5px;
    background-repeat: no-repeat;
    border: 1px solid #ccc;

    :focus {
      border-color: #0982f0;
      outline: none;
    }
  }
`;

const ReviewDate = styled.div`
  width: 500px;
  height: 30px;
  line-height: 2;
  margin-left: 20px;
  color: gray;
  margin-top: 15px;
  font-family: "Arita-dotum4.0(OTF)";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
`;

const ReviewComment = styled.div`
  width: 500px;
  height: 60px;

  line-height: 5;
  border-radius: 0px 0px 5px 5px;

  & input {
    width: 488px;
    height: 60px;
    margin-top: 12px;
    border: 1px solid #ccc;
    background-repeat: no-repeat;
    padding: 5px 5px;
    border-radius: 0px 0px 5px 5px;

    :focus {
      border-color: #0982f0;
    }

    ::placeholder {
      background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxyawNNOaJGwlR1wUq1PSSeLw3YwLj0S1vA&usqp=CAU);
      background-size: contain;
      background-position: 1px center;
      background-repeat: no-repeat;
      text-align: center;
      text-indent: 0;
    }
  }
`;

const ReviewProfile = styled.img``;

const Btn = styled.button`
  position: relative;
  /* display: flex; */
  -webkit-box-align: center;
  align-items: center;
  color: black;
  border: none;
  background-color: transparent;
  cursor: pointer;
  justify-content: center;

  :hover {
    color: red;
  }
`;

const ReviewComUp2 = styled.div`
  width: 500px;
  margin-left: 20px;
  line-height: 2;
  color: gray;

  input {
    position: relative;
    margin-left: 5px;
    background-repeat: no-repeat;
    border: 1px solid #ccc;

    :focus {
      border-color: #0982f0;
      outline: none;
    }
  }
`;

const ReviewProfile2 = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin: 3px;
`;

const Btn2 = styled.button`
  position: relative;
  /* display: flex; */
  -webkit-box-align: center;
  align-items: center;
  color: black;
  border: none;
  background-color: transparent;
  cursor: pointer;
  justify-content: center;

  :hover {
    color: red;
  }
`;

export default DetailReview;
