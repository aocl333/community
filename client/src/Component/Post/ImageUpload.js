import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const ImageUpload = (props) => {
  const FileUpload = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/post/image/upload", formData).then((res) => {
      props.setImage(res.data.filePath);
    });
  };
  return (
    <div>
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
};

export default ImageUpload;
