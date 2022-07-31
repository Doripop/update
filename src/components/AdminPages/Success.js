import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SuccessApplyList } from "../../redux/modules/adminSlice";


const Success = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(SuccessApplyList())
    }, [dispatch]);

    const list = useSelector((state) => state.adminSlice.SuccessInfo);
    console.log(list)


    return (
        <>
            {list?.map((item, i) => (
                <div className="Cards"
                    key={i}>
                    <div className="cafeCards">
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


// border: 2px solid #3FC275;
export default Success;