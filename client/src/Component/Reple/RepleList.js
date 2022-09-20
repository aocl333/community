import React, { useState, useEffect } from "react";
import axios from "axios";
import RepleContent from "./RepleContent";

import { RepleDiv } from "../../Style/ReplyCSS";

const RepleList = (props) => {
  const [repleList, setRepleList] = useState([]);

  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    axios.post("/api/reple/getreple", body).then((res) => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
      }
    });
  }, []);

  return (
    <div>
      <RepleDiv>
        {repleList.map((reple, idx) => {
          return <RepleContent reple={reple} key={idx} />;
        })}
      </RepleDiv>
    </div>
  );
};

export default RepleList;
