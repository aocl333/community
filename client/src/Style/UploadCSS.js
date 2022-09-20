import styled from "@emotion/styled";

const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const UploadForm = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  #title {
    border-radius: 5px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    margin-bottom: 10px;
    &:active,
    &:focus {
      outline: none;
      border: 1px solid #333;
    }
  }
  textarea {
    min-height: 350px;
    resize: none;
    border-radius: 5px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
      border: 1px solid #333;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background: #eee;
      border-radius: 5px;
      box-shadow: inset 0 0 5px whitesmoke;
    }
  }
  label {
    margin-top: 15px;
    font-weight: bold;
  }
`;

const UploadButtonDiv = styled.div`
  margin-top: 10px;
  display: flex;
  button {
    width: 100%;
    border-radius: 5px;
    height: 50px;
    line-height: 50px;
    background-color: #333;
    border: 1px solid #333;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.5s;
    &:hover {
      background-color: #111;
      border: 1px solid #111;
    }

    &.cancel {
      margin-right: 10px;
      background: #eee;
      border: 1px solid #eee;
      color: #555;
      font-size: 16px;
      font-weight: normal;
      &:hover {
        background: #ccc;
        border: 1px solid #ccc;
      }
    }
`;

export { UploadDiv, UploadForm, UploadButtonDiv };
