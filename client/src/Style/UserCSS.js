import styled from "@emotion/styled";

const LoginDiv = styled.div`
  position: fixed;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  @media (max-width: 750px) {
    width: 60%;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: bold;
      color: #666;
    }
    input {
      margin-bottom: 24px;
      padding: 0 16px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #ddd;
      border-radius: 5px;
      ::placeholder {
        font-size: 14px;
      }
      &:active,
      &:focus {
        outline: none;
        border: 1px solid #333;
      }
    }
    .nickName {
      margin-bottom: 24px;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
      color: #fff;
      background: #2879fe;
      font-size: 16px;
      font-weight: bold;
      transition: all 0.5s ease 0s;
      border: none;
    }
    .loginBtn {
      margin-top: 24px;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
      border: none;
      background: #2879fe;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      transition: all 0.5s;
      &:hover {
        background: #000;
      }
    }

    .signUp {
      margin-top: 30px;
      border: none;
      background: transparent;
      text-decoration: underline;
      color: #555;
      transition: all 0.5s;
      &:hover {
        color: #000;
      }
    }
  }
`;

export default LoginDiv;
