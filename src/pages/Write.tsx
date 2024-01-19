import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../firebase";
import DefaultHeader from "@components/header";
import confirmUser from "@hooks/confirmUser";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const [loginState] = confirmUser(); // 현재 로그인 상태(uid)
  const [user, setUser] = useState<any | null>(null); // 로그인된 유저 정보
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [category, setCategory] = useState(1); // 카테고리
  const quillRef = useRef(null);

  const modules = {
    // react-quill module
    toolbar: [
      [{ header: 1 }, { header: 2 }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image"],
    ],
  };

  // protect 설정
  useEffect(() => {
    if (loginState === false) {
      alert("로그인을 먼저 해주세요");
      navigate("/login", { replace: true });
    }
  });

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePostSubmit = async () => {
    try {
      // Firestore에 데이터 추가
      await db.collection("posts").add({
        uid: loginState,
        author: user.nickname,
        createdAt: new Date(),
        title,
        content,
        category: Number(category),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleExtractImages = async () => {
    await handlePostSubmit();
    navigate(-1);
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
          setUser(userData);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (loginState) {
      getUserData();
    }
  }, [loginState]);

  const handleSelect = (e: any) => {
    setCategory(e.target.value);
  };

  return (
    <WriteLayout>
      <DefaultHeader></DefaultHeader>
      <Main>
        <TitleBox>
          <input type="text" onChange={onChangeTitle} />
          <select onChange={handleSelect}>
            <option value={1}>카테고리1</option>
            <option value={2}>카테고리2</option>
          </select>
          <button onClick={handleExtractImages}>저장</button>
        </TitleBox>
        <ContentsBox>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            value={content}
            onChange={setContent}
            style={{
              height: "60vh",
              maxHeight: "1000px",
            }}
          />
        </ContentsBox>
      </Main>
    </WriteLayout>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: 100%;
  height: 100%;
  gap: 20px;
  padding: 50px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  & > input {
    border-radius: 5px;
    border: 0.5px solid #b1b1b1;
    background: #fff;
    padding: 15px 10px;
    width: 100%;
    font-size: 1.8rem;
  }

  & > button {
    border-radius: 5px;
    background: #d3d3d3;
    color: white;
    width: 200px;
    cursor: pointer;

    &:hover {
      background: #bdbdbd;
    }
  }

  & > select {
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #b1b1b1;
    padding: 0 10px;
    outline: none;
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 500px;
`;

const WriteLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: #fbfbfb;
`;

export default Write;
