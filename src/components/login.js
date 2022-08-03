import LoginModal from "../shard/modal/Loginmodal"
import React, { useState } from "react";
import styled from "styled-components";

//import react Icons
import { FiLogIn } from 'react-icons/fi'
// import { ReactComponent as newLogin } from "../css/public/newLogin.svg";
import newLogin from '../css/public/newLogin.svg'

const Login = () => {

  const [modalOpen, setModalOpen] = useState(false);
  
  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }


    return (
        <>
          <img src={newLogin} style={{cursor: "pointer"}} onClick={openModal}/>
          <LoginModal open={modalOpen} close={closeModal} header="B L A N K">
          </LoginModal>
        </>
    )
}

const LoginBtn = styled.button`
  color: white;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 30px;
  font-weight: 500;
`;


export default  Login;