import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 이메일
  const [pw, setPw] = useState(""); // 패스워드

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, pw);
      navigate("/", { replace: true });
    } catch (err: any) {
      alert("로그인에 실패했습니다");
    }
  };

  return (
    <LoginComponentBox>
      <input type="text" placeholder="이메일" onChange={onChangeEmail} />
      <input type="password" placeholder="패스워드" onChange={onChangePw} />
      <button onClick={handleLogin}>Login</button>
    </LoginComponentBox>
  );
}

const LoginComponentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 15px;
  padding: 50px 0;
  // 아이디 & 비밀번호 입력창
  & > input {
    border-radius: 10px;
    border: 1.3px solid #e5969c;
    background: #fff;
    padding: 15px;
    width: 90%;
    color: #e5969c;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    &::placeholder {
      color: #e1e1e1;
    }
  }
  // 로그인 버튼
  & > button {
    border-radius: 10px;
    background: #b88585;
    width: 90%;
    padding: 25px;
    color: #fff;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
    &:hover {
      background: #9d7272;
    }
  }
`;

export default LoginComponent;
