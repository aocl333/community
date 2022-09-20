import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoginDiv from "../../Style/UserCSS";

const Register = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [pwConfig, setPwConfig] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");
  const user = useSelector((state) => state.user);

  let navigate = useNavigate();
  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && pwConfig)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== pwConfig) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
    }
    if (!NameCheck) {
      return alert("닉네임 중복검사를 진행해 주세요.");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community-sinwon/user/profile_1.png",
    });

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      photoURL:
        "https://kr.object.ncloudstorage.com/react-community-sinwon/user/profile_1.png",
    };

    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        //회원가입 성공
        navigate("/login");
      } else {
        //회원가입 실패
        alert("회원가입이 실패하였습니다.");
      }
    });
  };

  const NameCheckFunc = (e) => {
    e.preventDefault();
    if (!Name) {
      return alert("닉네임을 입력해주세요.");
    }
    let body = {
      displayName: Name,
    };
    axios.post("/api/user/namecheck", body).then((res) => {
      if (res.data.success) {
        if (res.data.check) {
          setNameCheck(true);
          setNameInfo("사용가능한 닉네임입니다.");
        } else {
          setNameInfo("사용불가능한 닉네임입니다.");
        }
      }
    });
  };

  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <LoginDiv>
      <form>
        <label>닉네임</label>
        <input
          type="name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          disabled={NameCheck}
          placeholder="이름을 입력해주세요"
        />
        {NameInfo}
        <button className="nickName" onClick={(e) => NameCheckFunc(e)}>
          닉네임 중복검사
        </button>
        <label>이메일</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={PW}
          onChange={(e) => setPW(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
        />
        <label>비밀번호확인</label>
        <input
          type="password"
          value={pwConfig}
          onChange={(e) => setPwConfig(e.target.value)}
          placeholder="비밀번호를 다시 입력해주세요."
        />
        <button
          disabled={Flag}
          onClick={(e) => RegisterFunc(e)}
          className="loginBtn"
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Register;
