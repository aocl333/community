import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../firebase";

import { AiFillEdit } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { HeaderWrap } from "../Style/HeaderCSS";

const Header = () => {
  const [modal, setModal] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setModal(false);
      }
    };

    document.body.addEventListener("click", onClick);
    return () => {
      document.body.removeEventListener("click", onClick);
    };
  }, []);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <HeaderWrap>
      <div className="topNav">
        <Link to="/">로고</Link>
        <div className="topNavMenu">
          <Link to="/upload">
            <p>
              <span className="delete">글 작성</span>
              <AiFillEdit size="24" color="#fff" />
            </p>
          </Link>
          {user.accessToken === "" ? (
            <p>
              <Link to="/login">
                <FaUserAlt size="20" color="#fff" />
              </Link>
            </p>
          ) : (
            <>
              <p onClick={() => setModal(!modal)} ref={ref}>
                <span className="delete mypage">마이페이지</span>
                <FaUserAlt size="20" color="#fff" />
              </p>
              {modal && (
                <ul className="subMenu">
                  <Link to="/mypage">
                    <li>마이페이지</li>
                  </Link>
                  <Link to="">
                    <li onClick={LogoutHandler} className="logout">
                      로그아웃
                    </li>
                  </Link>
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </HeaderWrap>
  );
};

export default Header;
