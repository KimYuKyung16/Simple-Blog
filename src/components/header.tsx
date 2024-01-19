import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import confirmUser from "@hooks/confirmUser";
import { useNavigate } from "react-router-dom";

function DefaultHeader() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<null | string>(null); // 현재 프로필 값
  const [loginState, setLoginState] = confirmUser(); // 현재 로그인 상태(uid)
  const [profileState, setProfileState] = useState(false);

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/login", { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  // 유저 정보 가져오기
  useEffect(() => {
    const getUserData = async () => {
      try {
        // 문서의 데이터 가져오기
        const docSnapshot = await db.collection("users").doc(loginState).get();

        if (docSnapshot.exists) {
          // 문서가 존재하는 경우
          const userData = docSnapshot.data();
          if (!userData) return;
          setProfile(userData.profile);
          return userData;
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (loginState) {
      getUserData();
    }
  }, [loginState]);

  return (
    <DefaultHeaderLayout>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        Blog
      </h1>
      {profile ? (
        <img
          src={profile}
          alt="유저 프로필"
          onClick={() => {
            setProfileState(!profileState);
          }}
        />
      ) : null}
      {profileState ? (
        <ProfileBox>
          <h3></h3>
          <p>
            <strong>uid</strong> sdfsdfsdfsdfs
          </p>
          {profile ? <img src={profile} alt="유저 프로필" /> : null}
          <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
        </ProfileBox>
      ) : null}
    </DefaultHeaderLayout>
  );
}

const DefaultHeaderLayout = styled.header`
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, #ebb1a4 0%, rgba(255, 255, 255, 0) 100%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 40px 10px 40px;
  color: #f7f7f7;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  & > h1 {
    cursor: pointer;
  }

  & > img {
    border-radius: 100%;
    height: 50px;
    cursor: pointer;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 30px;
  top: 80px;
  background: white;
  border-radius: 10px;
  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.15);
  width: 350px;
  height: auto;
  z-index: 1;
  padding: 30px;
  gap: 20px;
  overflow: hidden;

  & > h3 {
    color: #434343;
    font-size: 3rem;
    font-weight: 900;
  }

  & > p {
    font-weight: 600;
    color: #5e5e5e;
  }

  & > img {
    border-radius: 100%;
    width: 50%;
  }
`;

const LogoutBtn = styled.button`
  border-radius: 5px;
  background: #ebb1a4;
  color: white;
  padding: 10px 20px;
  width: 100%;
  font-size: 1.7rem;
  cursor: pointer;

  &:hover {
    background: #e5969c;
  }
`;

export default DefaultHeader;
