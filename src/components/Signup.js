import SignupModal from "../shard/modal/Signupmodal";
import React, { useState } from "react";
import styled from "styled-components";


//import react Icons
import { SiGnuprivacyguard } from 'react-icons/si'
// import { ReactComponent as newSignup } from "../css/public/newSignup.svg";
import newSignup from '../css/public/newSignup.svg'

const Signup = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }


    return (
        <>
      <img src={newSignup} onClick={openModal} style={{cursor: "pointer"}}/>
      <SignupModal open={modalOpen} close={closeModal} header="BLANK 회원가입">
      </SignupModal>

    </>
  )
}

const SignupBtn = styled.button`
  color: white;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 30px;
  font-weight: 500; 
`;

export default Signup;