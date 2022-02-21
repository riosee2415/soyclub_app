import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ececec;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 0px 7px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 7px;
`;

const Name = styled.span`
  font-size: 14px;
  color: #2d2c2c;
  margin-right: 25px;
`;

const StatusMsg = styled.span`
  font-size: 13px;
  color: #494949;
`;

const FriendBox = ({ pk, avatar, username, stm }) => {
  return (
    <Wrapper>
      <Avatar src={avatar} />
      <Name>{username}</Name>
      <StatusMsg>{stm ? stm : "-"}</StatusMsg>
    </Wrapper>
  );
};

export default FriendBox;
