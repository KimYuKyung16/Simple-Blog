import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import LoginComponent from "@components/login";
import SignUpComponent from "@components/signup";
import { wave_move } from "../styles/animation";

function Login() {
  const [selected, setSelected] = useState<String>("login"); // login & signup

  return (
    <LoginLayout>
      <Header>
        <h1>Blog</h1>
      </Header>
      <Main>
        <AnimationBox></AnimationBox>
        <AnimationBox2></AnimationBox2>
        <LoginBox>
          <LoginBoxBtns $selected={selected}>
            <button
              onClick={() => {
                setSelected("login");
              }}
            >
              로그인
            </button>
            <button
              onClick={() => {
                setSelected("signup");
              }}
            >
              회원가입
            </button>
          </LoginBoxBtns>
          <LoginBoxContents>
            {selected === "login" ? <LoginComponent /> : null}
            {selected === "signup" ? <SignUpComponent /> : null}
          </LoginBoxContents>
        </LoginBox>
      </Main>
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(113deg, #f2d1a4 0%, #e494a4 99.15%);
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  padding: 10px 40px;
  color: #f7f7f7;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const Main = styled.main`
  display: flex;
  margin-top: 15vh;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 0 10vw;
`;

const AnimationBox = styled.div`
  width: 2000px;
  height: 2000px;
  background: #ffffff3f;
  position: fixed;
  bottom: -150vh;
  left: 0;
  border-radius: 45%;
  animation: ${wave_move} 5s 1s infinite linear;
`;

const AnimationBox2 = styled.div`
  width: 2000px;
  height: 2000px;
  background: #ffffff3f;
  position: fixed;
  bottom: -150vh;
  left: 0;
  border-radius: 45%;
  animation: ${wave_move} 5.5s 1s infinite linear;
`;

const LoginBox = styled.div`
  width: 30%;
  height: auto;
  min-width: 500px;
  min-height: 400px;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1;
`;

const LoginBoxBtns = styled.div<{ $selected: String }>`
  display: flex;
  flex-direction: row;
  // 로그인 & 회원가입 버튼
  & > button {
    width: 50%;
    background: rgba(255, 255, 255, 0.5);
    color: #e5969c;
    padding: 20px;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 20px 20px 0 0;
    cursor: pointer;
    // 로그인 버튼
    &:first-child {
      background: ${(props) =>
        props.$selected === "login" ? "#ffffff" : "rgba(255, 255, 255, 0.5)"};
    }
    // 회원가입 버튼
    &:last-child {
      background: ${(props) =>
        props.$selected === "signup" ? "#ffffff" : "rgba(255, 255, 255, 0.5)"};
    }
  }
`;

const LoginBoxContents = styled.div`
  height: auto;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

export default Login;
