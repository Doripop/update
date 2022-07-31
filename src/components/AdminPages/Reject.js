import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CafeRejectList } from "../../redux/modules/adminSlice";


const Reject = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch((CafeRejectList()))
    }, [dispatch]);

    const list = useSelector((state) => state.adminSlice.RejectInfo);
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
                            {item.addressdetail} <br />
                            {item.zonenum}
                        </span>
                    </div>
                </div>
            ))}
        </>
    )
}


export default Reject;