import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import List from "./pages/List";
import Login from "./pages/Login";
import Message from "./pages/Message";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Send from "./pages/Send";

const MainDiv = styled.div`
  width: 100%;
  height: calc(100vh - 60px);

  overflow: scroll;
`;

const NavDiv = styled.div`
  width: 100%;
  height: 60px;
`;

const App = () => {
  const [path, setPath] = useState("/");

  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, []);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <section>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>

      {path === "/" ? null : (
        <>
          <MainDiv>
            <Routes>
              <Route exact path="/list" element={<List />} />
              <Route exact path="/message" element={<Message />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/setting" element={<Setting />} />
              <Route exact path="/send/:key" element={<Send />} />
            </Routes>
          </MainDiv>

          <NavDiv>
            <Routes>
              <Route exact path="/list" element={<Nav />} />
              <Route exact path="/message" element={<Nav />} />
              <Route exact path="/profile" element={<Nav />} />
              <Route exact path="/setting" element={<Nav />} />
            </Routes>
          </NavDiv>
        </>
      )}
    </section>
  );
};

export default App;
