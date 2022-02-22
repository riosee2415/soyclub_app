import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBanner from "../components/TopBanner";
import styled from "styled-components";
import { Input, Button } from "antd";
import axios from "axios";

const { TextArea } = Input;

const ViewName = styled.div`
  margin: 10px;
  color: #999;
  font-size: 13px;
`;

const CustomTextArea = styled(TextArea)`
  margin: 10px;
  width: calc(100% - 20px);
  height: 250px;

  resize: none;
  outline: none;
  border-radius: 5px;
  border: 1px solid #c4bdff;

  padding: 5px;
`;

const CustomButton = styled.button`
  margin: 10px;
  width: calc(100% - 20px);
  height: 30px;

  outline: none;
  background-color: skyblue;
  color: #fff;

  border-radius: 5px;

  box-shadow: 3px 3px 3px #ccc;
`;

const Send = () => {
  const [sendKey, setSendKey] = useState(null);
  const [sendValue, setSendValue] = useState("");
  const loc = useLocation();

  const sendValueOnChange = useCallback(
    (event) => {
      setSendValue(event.target.value);
    },
    [sendValue]
  );

  useEffect(() => {
    const path = loc.pathname.split("/");

    setSendKey(path[2]);

    // sendKey를 빽으로 보내요.
    // 빽에서 받은 데이터로 user테이블에서
    // 정보를 조회해요.
    // 프론트로 보내요.
    // 프론트는 정보를 받아서 스테이트에 저장해요.
  }, []);

  const sendAction = useCallback(async () => {
    const result = await axios.post("http://localhost:4000/api/msg/send", {
      toId: localStorage.getItem("Soy.UserId"),
      fromId: sendKey,
      content: sendValue || "내용 없음",
    });
  }, [sendValue]);

  return (
    <>
      <TopBanner title="Send Message" />

      <ViewName>사람이름 님에게 메세지를 전송합니다.</ViewName>
      <CustomTextArea value={sendValue} onChange={sendValueOnChange} />
      <CustomButton onClick={() => sendAction()}>쪽지 보내기</CustomButton>
    </>
  );
};

export default Send;
