import React, { useEffect, useState } from "react";
import TopBanner from "../components/TopBanner";
import FriendBox from "../components/FriendBox";
import axios from "axios";

const List = () => {
  const [fList, setFList] = useState([]);

  const getMyFriends = async () => {
    const myId = await localStorage.getItem("Soy.UserId");

    const result = await axios.post(
      "http://localhost:4000/api/user/friend/list",
      { loggedId: myId }
    );

    setFList(result.data);
  };

  useEffect(() => {
    getMyFriends();
  }, []);

  return (
    <div>
      <TopBanner title="Friends" />

      {fList &&
        fList.map((data) => {
          return (
            <FriendBox
              key={data.id}
              pk={data.id}
              avatar={data.avatar}
              username={data.username}
              stm={data.statusMsg}
            />
          );
        })}
    </div>
  );
};

export default List;
