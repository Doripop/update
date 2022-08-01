import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AllRegCafe, CafeApplyList, CafeRejectList, InfoLoad, SuccessApplyList, userInfoLoad } from "../redux/modules/adminSlice";

import ScrollBtn from "./ScrollBtn";
import '../css/partCss/Admin.css';

// 페이지네이션
import Success from "./AdminPages/Success";
import Reject from "./AdminPages/Reject";
import AllList from "./AdminPages/AllList";
import RealAllCafe from "./AdminPages/RealAllCafe";

import {BsCheckSquare,BsXSquare} from "react-icons/bs";
import {AiOutlineCheckSquare, AiOutlineCloseSquare} from "react-icons/ai"





const Admin = () => {

    const [subMenu, setSubMenu] = useState("A")

    const dispatch = useDispatch()

    //갯수 불러오기 
    React.useEffect(()=>{
        dispatch(CafeApplyList())
        dispatch(AllRegCafe())
        dispatch((CafeRejectList()))
        dispatch(SuccessApplyList())
    },[])

    const list = useSelector((state) => state.adminSlice.CafeInfo);
    const list1 = useSelector((state) => state.adminSlice.SuccessInfo);
    const list2 = useSelector((state) => state.adminSlice.RejectInfo);
    const list3 = useSelector((state) => state.adminSlice.RealInfo);
    


    return (
        <div className="totalDiv">
            <div className="conDiv">
                <div className="leftConDiv">
                    <div className="detailLine">
                        오늘도 일해주세요!<br/>
                        관리자님!
                    </div>
                    <div className="space"></div>
                    <button
                    onClick={()=>{
                        setSubMenu("A")
                    }}
                    className="leftButtons"
                    >
                    <span>전체 등록 리스트</span> <span className="cntCafes">{list?.length}개  &gt;</span>
                    </button>
                    <button
                    onClick={()=>{
                        setSubMenu("D")
                    }}
                    className="leftButtons"
                    >
                    <span>개설된 카페</span><span className="cntCafes">{list3?.length}개  &gt;</span>
                    </button>
                    <button
                    onClick={()=>{
                        setSubMenu("B")
                    }}
                    className="leftButtons"
                    >
                    <div className="iconOrder"><BsCheckSquare style={{ width:"25px", height:"25px" }} /></div><div> 최종 승인 카페</div><span className="cntCafes">{list1?.length}개 &gt;</span>
                    </button>
                    <button
                    onClick={()=>{
                        setSubMenu("C")
                    }}
                    className="leftButtons"
                    >
                    <div className="iconOrder"><BsXSquare style={{ width:"25px", height:"25px"}} /></div><div>최종 거절 카페</div><span className="cntCafes">{list2?.length}개  &gt;</span>
                    </button>
                </div>
                <div className="rightConDiv">
                    {
                        subMenu === "A" && <h3 className="registerState">전체 등록 리스트</h3> ||
                        subMenu === "B" && <h3 className="registerState">최종 승인 카페</h3> ||
                        subMenu === "C" && <h3 className="registerState">최종 거절 카페</h3> ||
                        subMenu === "D" && <h3 className="registerState">개설된 카페</h3>
                    }
                    <div className="thickLine">
                        <div></div>
                        <hr/>
                    </div>
                    <div className="listDiv">
                        {
                            subMenu === "A" && <AllList /> ||
                            subMenu === "B" && <Success /> ||
                            subMenu === "C" && <Reject /> ||
                            subMenu === "D" && <RealAllCafe />
                        }
                    </div>
                </div>
            <ScrollBtn/>
            </div>
        </div>
    );
}

export default Admin;