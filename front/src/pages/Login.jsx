import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Whole = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height};

  padding: 0px 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RowWrapper = styled(Wrapper)`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const BotWrapper = styled(Wrapper)`
  background-color: #001;
  color: #fafafa;
  font-size: 11.5px;
`;

const MainTitle = styled.h1`
  font-size: 28px;
  color: #1e1e1e;
`;

const LoginInput = styled.input`
  width: 85%;
  height: 40px;

  border-radius: 7px;
  border: none;
  box-shadow: 4px 4px 10px #999;
  outline: none;
  padding: 0px 5px;
  transition: 0.5s;

  &:focus {
    box-shadow: 4px 4px 10px skyblue;
  }
`;

const EmailGuide = styled.span`
  font-size: 11.5px;
  color: #999;
  margin-top: 15px;
`;

const SignButton = styled.button`
  width: 85%;
  height: 40px;

  border-radius: 7px;
  border: none;

  margin-bottom: 5px;

  color: #ffe;
  background-color: ${(props) => props.bg};

  box-shadow: 2px 2px 2px #d2d2d2;
`;

const FindText = styled.span`
  font-size: 11.5px;
  color: #0984e3;
  font-weight: 700;
  margin: 0px 15px;
`;

const Login = () => {
  const [proc, setProc] = useState(1);
  const [emailV, setEmailV] = useState("");

  const navigate = useNavigate();

  const emailSubmit = async () => {
    const networkResult = await axios.post(
      "http://localhost:4000/api/user/checkEmail",
      {
        email: emailV,
      }
    );

    return;
    setProc(2);
  };

  const checkSubmit = () => {
    navigate("/list");
  };

  const emailChangeHandler = useCallback(
    (event) => {
      setEmailV(event.target.value);
    },
    [emailV]
  );

  return (
    <Whole>
      {/* SECTION-1 [프로젝트 타이틀] */}
      <Wrapper height="30vh">
        <MainTitle>SOYCLUB</MainTitle>
      </Wrapper>

      {/* SECTION-2 [로그인 인풋] */}
      <Wrapper height="37vh">
        {proc === 1 ? (
          <LoginInput
            type="email"
            value={emailV}
            onChange={emailChangeHandler} // event를 함께 전달. onClick에서는 사용을 하지 않음!
          />
        ) : (
          <LoginInput type="text" />
        )}

        <EmailGuide>
          {proc === 1
            ? `로그인 할 이메일을 입력해주세요.`
            : `이메일로 전송된 인증코드를 입력해주세요.`}
        </EmailGuide>

        <br />
        <br />

        {proc === 1 ? (
          <>
            <SignButton bg="#74b9ff" onClick={() => emailSubmit()}>
              SIGN IN
            </SignButton>
            <SignButton bg="#0984e3">SIGN UP</SignButton>
          </>
        ) : (
          <SignButton bg="#0984e3" onClick={() => checkSubmit()}>
            CHECK CODE
          </SignButton>
        )}
      </Wrapper>

      {/* SECTION-3 [아이디,비밀번호 찾기] */}
      <RowWrapper height="30vh">
        <FindText>아이디 찾기</FindText>
        <FindText>비밀번호 찾기</FindText>
      </RowWrapper>

      {/* SECTION-4 [푸터 정보] */}
      <BotWrapper height="3vh">Development By 4LEAF.YSH</BotWrapper>
    </Whole>
  );
};

export default Login;
