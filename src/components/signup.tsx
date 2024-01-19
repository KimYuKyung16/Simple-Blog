import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import validateEmail from "@utils/validateEmail";
import { auth, db } from "../firebase";

function SignUpComponent() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(""); // 닉네임
  const [email, setEmail] = useState(""); // 이메일
  const [pw, setPw] = useState(""); // 패스워드
  const [comparePw, setComparePw] = useState(""); // 패스워드 확인

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const onChangeComparePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComparePw(e.target.value);
  };

  // db에 유저 추가
  const confirmLoginState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // 사용자가 로그인되어 있는 경우
        const uid = user.uid;
        db.collection("users").doc(uid).set({
          nickname,
          email,
          pw,
          profile: "/images/default_profile.jpg",
        });
      } else {
        // 사용자가 로그아웃되어 있는 경우
        alert("로그아웃 되어있는 상태입니다.");
      }
    });
  };

  // 회원가입 과정
  const handleSignUp = async () => {
    try {
      if (
        !nickname.length ||
        !email.length ||
        !pw.length ||
        !comparePw.length
      ) {
        alert("입력하지 않은 값이 있습니다.");
        return;
      }
      if (!validateEmail(email)) {
        alert("이메일의 형식이 올바르지 않습니다.");
      }
      if (pw !== comparePw) {
        alert("패스워드와 비교할 패스워드가 일치하지 않습니다.");
        return;
      }
      await auth.createUserWithEmailAndPassword(email, pw); // 회원가입 처리
      await auth.signInWithEmailAndPassword(email, pw); // 로그인 처리
      await confirmLoginState(); // user 목록에 추가
      navigate("/");
    } catch (error: any) {
      console.error("회원가입 중 에러 발생:", error);
    }
  };

  return (
    <SignUpComponentBox>
      <input type="text" placeholder="닉네임" onChange={onChangeNickname} />
      <input type="text" placeholder="이메일" onChange={onChangeEmail} />
      <input type="password" placeholder="패스워드" onChange={onChangePw} />
      <input
        type="password"
        placeholder="패스워드 확인"
        onChange={onChangeComparePw}
      />
      <button onClick={handleSignUp}>signup</button>
    </SignUpComponentBox>
  );
}

const SignUpComponentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px 0;
  gap: 15px;
  // 닉네임 & 이메일 & 패스워드 & 패스워드 확인
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
  // signup 버튼
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

export default SignUpComponent;
