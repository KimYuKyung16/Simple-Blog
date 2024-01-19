import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/carousel.css";
import { auth, db } from "../firebase";
import confirmUser from "hooks/confirmUser";

function Home() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<null | string>(null); // 현재 프로필 값
  const [loginState] = confirmUser(); // 현재 로그인 상태(uid)
  const [posts, setPosts] = useState<any>([]); // 게시글들
  const [filter, setFilter] = useState("total"); // total / me
  const [profileState, setProfileState] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(1);
  const [user, setUser] = useState<any | null>(null); // 로그인된 유저 정보

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // protect 설정
  useEffect(() => {
    if (loginState === false) {
      alert("로그인을 먼저 해주세요");
      navigate("/login", { replace: true });
    }
  });
  // 로그아웃 기능
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
  // 게시글 리스트 가져오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsCollection = await db
          .collection("posts")
          // .orderBy("createdAt", "desc")
          .where("category", "==", currentCategory)
          .get();
        const postsData = postsCollection.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, [currentCategory]);

  return (
    <HomeLayout>
      <Header>
        <HeaderTop>
          <h1>Blog</h1>
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
            <ProfileLayout>
              <h3>{user.nickname ? user.nickname : "흠"}</h3>
              <p>
                <strong>uid </strong>
                {loginState}
              </p>
              {profile ? <img src={profile} alt="유저 프로필" /> : null}
              <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
            </ProfileLayout>
          ) : null}
        </HeaderTop>

        <CarouselBox>
          <Slider {...carouselSettings} className="carouselSlide">
            <CarouselBox1>
              <DescriptionBox>
                <h2>사람들과 일상을</h2>
                <h1>공유해보세요</h1>
              </DescriptionBox>
              <ImageBox>
                <img src="/images/carousel1.jpg" alt="" />
                <a href="https://kr.freepik.com/free-vector/hand-drawn-flat-design-poetry-illustration_23252620.htm#query=%EA%B8%80%EC%93%B0%EA%B8%B0&position=2&from_view=keyword&track=sph&uuid=882f79cb-2c31-4f07-b63c-3c99cf995af5">
                  Freepik
                </a>
              </ImageBox>
            </CarouselBox1>
            <CarouselBox2>
              <DescriptionBox>
                <h2>사람들과 일상을</h2>
                <h1>공유해보세요!!!!!</h1>
              </DescriptionBox>
              <ImageBox>
                <img src="/images/carousel1.jpg" alt="" />
                <a href="https://kr.freepik.com/free-vector/hand-drawn-flat-design-poetry-illustration_23252620.htm#query=%EA%B8%80%EC%93%B0%EA%B8%B0&position=2&from_view=keyword&track=sph&uuid=882f79cb-2c31-4f07-b63c-3c99cf995af5">
                  Freepik
                </a>
              </ImageBox>
            </CarouselBox2>
          </Slider>
        </CarouselBox>
      </Header>
      <Main>
        <Nav $selected={currentCategory}>
          <ul>
            <li
              onClick={() => {
                setCurrentCategory(1);
              }}
            >
              카테고리1
            </li>
            <hr />
            <li
              onClick={() => {
                setCurrentCategory(2);
              }}
            >
              카테고리2
            </li>
          </ul>
        </Nav>
        <FilterBox $filter={filter}>
          <p
            onClick={() => {
              setFilter("total");
            }}
          >
            전체
          </p>
          <hr />
          <p
            onClick={() => {
              setFilter("me");
            }}
          >
            내가 쓴 글
          </p>
        </FilterBox>
        <PostListBox>
          {posts.map((x: any) => {
            let formattedDate;
            if (x.createdAt) {
              let date = new Date(x.createdAt.seconds * 1000);

              // 날짜를 "YYYY.MM.DD" 형식으로 포맷팅
              formattedDate = new Intl.DateTimeFormat("fr-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(date);
            }

            return (
              <Post>
                <img src="/images/default_thumbnail.jpg" />
                <div>
                  <h5>{x.title}</h5>
                  <p>{x.content}</p>
                  <div>
                    <p>{formattedDate}</p>
                    <p>{x.author}</p>
                  </div>
                </div>
              </Post>
            );
          })}
        </PostListBox>
      </Main>
      <WriteFloatingBtn
        onClick={() => {
          navigate("write");
        }}
      >
        <img src="/icons/add-icon.svg" alt="글쓰기 버튼" />
      </WriteFloatingBtn>
    </HomeLayout>
  );
}

const HomeLayout = styled.div`
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 100vh;
  background: #fbfbfb;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  background: linear-gradient(113deg, #f2d1a4 0%, #e494a4 99.15%);
  height: 30vh;
  min-height: 500px;
  overflow: hidden;
`;

const HeaderTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  color: #f7f7f7;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  & > img {
    border-radius: 100%;
    height: 50px;
    cursor: pointer;
  }
`;

const ProfileLayout = styled.div`
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
    white-space: pre-wrap;
    word-break: break-all;
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

const CarouselBox = styled.div`
  height: calc(100% - 40px);
`;

const CarouselBox1 = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center !important;
  height: 425px !important;
  width: 100% !important;
  background: rgba(255, 255, 255, 0.4);
  gap: 10vw;
`;

const CarouselBox2 = styled(CarouselBox1)`
  /* background: rgba(152, 89, 89, 0.4); */
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  & > h2 {
    font-size: 5rem;
    white-space: nowrap;
  }

  & > h1 {
    font-size: 8rem;
    white-space: nowrap;
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.nav<{ $selected: number }>`
  width: 100%;
  max-width: 1100px;
  border-bottom: 1px solid #5a5a5a;
  padding: 20px 50px;
  margin: 30px 0;

  & > ul {
    display: flex;
    flex-direction: row;
    gap: 40px;

    & > li {
      display: flex;
      font-size: 2rem;
      cursor: pointer;

      &:first-child {
        color: ${(props) => (props.$selected === 1 ? "#ebb1a4" : "#5a5a5a")};
      }

      &:last-child {
        color: ${(props) => (props.$selected === 2 ? "#ebb1a4" : "#5a5a5a")};
      }

      &:hover {
        color: #ebb1a4;
        /* font-weight: 700; */
      }
    }
  }
`;

const FilterBox = styled.div<{ $filter: string }>`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 1.5rem;
  width: 100%;
  max-width: 1100px;
  justify-content: flex-end;
  padding: 0 50px;

  & > p {
    // 전체글
    &:first-child {
      color: ${(props) => (props.$filter === "total" ? "#e494a4" : "#7a7a7a")};
      font-weight: ${(props) => (props.$filter === "total" ? "700" : "500")};
    }
    // 내가 쓴 글
    &:last-child {
      color: ${(props) => (props.$filter === "me" ? "#e494a4" : "#7a7a7a")};
      font-weight: ${(props) => (props.$filter === "me" ? "700" : "500")};
    }

    &:hover {
      color: #e494a4;
      font-weight: bold;
    }
    cursor: pointer;
  }
`;

const PostListBox = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  grid-template-columns: repeat(3, minmax(auto, 350px)); // pc 화면일 땐 3줄
  gap: 50px 19px;
  padding: 50px 50px;
`;

const Post = styled.div`
  height: 400px;
  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  & > img {
    width: 100%;
    height: 55%;
    object-fit: cover;
  }

  & > div {
    display: flex;
    flex-direction: column;
    height: 45%;
    padding: 10px 15px;
    justify-content: space-between;

    & > h5 {
      font-size: 3rem;
    }

    & > p {
      font-size: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const WriteFloatingBtn = styled.button`
  background: #e5969c;
  padding: 20px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: fixed;
  bottom: 10vh;
  right: 10vw;
  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

export default Home;
