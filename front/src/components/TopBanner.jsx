import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 65px;

  background-color: royalblue;
  color: #fff;

  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;

  box-shadow: 3px 3px 3px #999;

  padding: 10px;

  margin-bottom: 10px;
`;

const TopBanner = ({ title }) => {
  return <Wrapper>{title}</Wrapper>;
};

export default TopBanner;
