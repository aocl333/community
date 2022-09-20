import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";

import { PostDiv, Post, BtnDiv } from "../../Style/PostDetailCSS";

const Detail = ({ PostInfo, Flag }) => {
  let params = useParams();
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패되었습니다.");
        });
    }
  };

  const setTime = (a, b) => {
    if (a !== b) {
      return moment(b).format(`YYYY년 MMMM Do  a hh:mm`) + ` (수정)`;
    } else {
      return moment(a).format(`YYYY년 MMMM Do , a hh:mm`);
    }
  };

  return (
    <PostDiv>
      <Post>
        <h1 className="title">{PostInfo.title}</h1>
        <div className="userContent">
          <Avatar
            size="36"
            round={true}
            src={PostInfo.author.photoURL}
            style={{ border: `1px solid #eee` }}
          />
          <div className="userIfnfo">
            <p className="displayName">
              {PostInfo.author.displayName}
              {user.uid === PostInfo.author.uid && (
                <span className="writer">작성자</span>
              )}
            </p>
            <p className="postTime">
              {setTime(PostInfo.createdAt, PostInfo.updatedAt)}
            </p>
          </div>
        </div>
        {PostInfo.image ? (
          <img
            src={`http://localhost:5000/${PostInfo.image}`}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}
        <p className="postContent">{PostInfo.content}</p>
      </Post>
      {user.uid === PostInfo.author.uid && (
        <BtnDiv>
          <div>
            <Link to={`/edit/${PostInfo.postNum}`}>
              <button className="edit">수정</button>
            </Link>
            <button className="delete" onClick={DeleteHandler}>
              삭제
            </button>
          </div>
          <button className="list" onClick={() => navigate("/")}>
            목록
          </button>
        </BtnDiv>
      )}
    </PostDiv>
  );
};

export default Detail;
