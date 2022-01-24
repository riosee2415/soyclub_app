import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBox = styled.nav`
  width: 100%;
  height: 60px;
  background-color: skyblue;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  border-top-right-radius: 14px;
  border-top-left-radius: 14px;

  box-shadow: -4px -4px 10px #d4d4d4;
`;

class Nav extends React.Component {
  render() {
    return (
      <NavBox>
        <NavLink to="/list">List</NavLink>
        <NavLink to="/message">Message</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/setting">Setting</NavLink>
      </NavBox>
    );
  }
}

export default Nav;
