import React from "react";
import styled from "styled-components";
import "../../css/partCss/DetailMenu.css";

import { SiBuymeacoffee } from 'react-icons/si';
import { GiCakeSlice } from 'react-icons/gi';

import { useDispatch, useSelector } from "react-redux"
import { DetailCafeMenu } from "../../redux/modules/AllSlice";
import { useNavigate, useParams } from "react-router-dom";



const DetailMenu = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const cafeId = Number(params.id);
    const navigate = useNavigate();
    // const cafeId = props
    const menuList = useSelector((state) => state.AllSlice.DetailCafeMenuList);
    console.log(menuList)
    // console.log(cafeId.id)
    React.useEffect(() => {
        //메뉴 정보 받아오기
        dispatch(DetailCafeMenu(cafeId))
    }, [dispatch, cafeId])

    return (
        <>
            <div className="cafeDetailMenuTab">
                <div className="drinkMenu">
                    <div className="coffeeMenuTitle">
                        <SiBuymeacoffee className="coffeeIcon" /> <p>커피 메뉴</p>
                    </div>
                    <div className="drinkMenuList">
                        {menuList?.drink.map((item, i) => (
                            <div>
                                <Coffee
                                    id={item.menuid}>
                                    <CoMenu src = {item.menuimg}/>
                                    <div className="menuDetail" >
                                        <p>{item.menuname}</p><p>{item.menuprice}원</p>
                                    </div>
                                </Coffee>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="CafeHr"></div>

                <div className="dessertMenu">
                    <p><GiCakeSlice className="cake" /> 디저트메뉴</p>
                    {menuList?.dessert.map((item, i) => (
                        <>
                        <Dessert
                            id={item.menuid}>
                            <CoMenu src = {item.menuimg}/>
                            <p>
                                {item.category}<br/>
                                {item.menuname}<br/>
                                <br/>
                                {item.menuprice}원
                            </p>
                        </Dessert>
                        </>
                    ))}
                </div>
            </div>
            
        </>
    );
}

const CoffeeMenu = styled.div`
`;

const Coffee = styled.div`
    width: 350px;
    height: 100px;
    border: 1px solid #D9D9D9;
    
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    border-radius:3px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    & p {
        margin-top: -20px;
    }

`;

const CoMenu = styled.img`
    width: 80px;
    height: 80px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    margin : 10px 20px 10px 20px;
    object-fit: cover;
`;

const DessertMenu = styled.div`
`;

const Dessert = styled.div`
    width: 350px;
    height: 100px;
    border: 1px solid black;

    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;

    & p {
        margin-top: -20px;
    }

    : hover {
        cursor: default;
        box-shadow : 0px 3px 0px 0px #E0E0E0;
    }
`;
export default DetailMenu;