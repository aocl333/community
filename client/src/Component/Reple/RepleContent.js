import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { RepleContentDiv, RepleForm } from "../../Style/ReplyCSS";

const RepleContent = (props) => {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EditFlag, setEditFlag] = useState(false); //댓글수정 on/off
  const [Reple, setReple] = useState(props.reple.reple); // 댓글수정내용

  const user = useSelector((state) => state.user);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));

  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reple: Reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
    };
    axios.post("/api/reple/edit", body).then((res) => {
      if (res.data.success) {
        alert("댓글 수정이 성공하였습니다.");
      } else {
        alert("댓글 수정이 실패하였습니다.");
      }
      return window.location.reload();
    });
  };

  const DeleteHandler = (e) => {
    e.preventDefault();

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postId: props.reple.postId,
        repleId: props.reple._id,
      };
      axios
        .post("/api/reple/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("댓글이 삭제에 실패되었습니다.");
        });
    }
  };

  return (
    <RepleContentDiv>
      <div className="author">
        <p>{props.reple.author.displayName}</p>
        {props.reple.author.uid === user.uid && (
          <div className="modalControl">
            <span onClick={() => setModalFlag(true)}>...</span>
            {ModalFlag && (
              <ul className="modalList" ref={ref}>
                <li
                  onClick={() => {
                    setEditFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </li>
                <li className="delete" onClick={DeleteHandler}>
                  삭제
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      {EditFlag ? (
        <div>
          <RepleForm>
            <form>
              <input
                value={Reple}
                placeholder="댓글을 작성해 주세요"
                onChange={(e) => setReple(e.target.value)}
              />
              <button onClick={submitHandler}>등록</button>
            </form>
            <div className="cancel">
              <button onClick={() => setEditFlag(false)}>취소</button>
            </div>
          </RepleForm>
        </div>
      ) : (
        <p>{props.reple.reple}</p>
      )}
    </RepleContentDiv>
  );
};

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default RepleContent;
