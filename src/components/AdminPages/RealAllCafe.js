import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AllRegCafe, CafeRemove, SuccessApplyList } from "../../redux/modules/adminSlice";



const RealAllCafe = () => {

    const [action, setAction] = useState(false);

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(AllRegCafe())
    }, [dispatch]);

    const list = useSelector((state) => state.adminSlice.RealInfo);
    console.log(list)

    const CafeDelete = (cafeid) =>{
        // console.log(id,regid, permit)
        dispatch(CafeRemove({
            cafeid : cafeid
        }))
    }



    return (
        <>
            {list?.map((item, i) => (
                <div className="Cards"
                    key={i}>
                    <div className="cafeCards">
                        <div id='question'>
                            <span className="deleteLine">카페 페이지를<br/>
                            삭제하시겠습니까?</span><br/>
                            <button className="deleteButton">삭제</button>
                        </div>
                        <span className="cafeListName">{item.cafename}</span><br/>
                        <span className="cafeListDetail">
                            {item.address}&nbsp; 
                            {item.addressdetail} <br/>
                            {item.zonenum}
                        </span>
                        
                        
                    </div>
                                        
                </div>
                
            ))}
        </>
    )
}




export default RealAllCafe;