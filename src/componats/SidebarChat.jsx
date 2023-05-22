import React from "react";
import "../css/sidebarChat.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_USER, USER_GROUP } from "../graphQL/query";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import localStorage from "local-storage";

const SidebarChat = () => {
  const { data: allUserData, loading: allUserLoading } = useQuery(GET_ALL_USER);

  const navigate = useNavigate();

  const userId = localStorage.get("loginUserId");

  if (userId === null) {
    navigate("/");
  }

  const { data: groupData, loading: groupLoading } = useQuery(USER_GROUP, {
    variables: {
      userId: userId,
    },
  });

  

  return (
    <div className="sidebarChat">
      {allUserLoading ? (
        "loading"
      ) : (
        <div>
          {allUserData?.allUser?.map((elm, index) => {
            return (
              <Link
                to={`/chat/${userId}/${elm.id}`}
                key={index}
                className="userData"
              >
                <div className="userProfile">
                  {" "}
                  <Avatar
                    src={`https://avatars.dicebear.com/api/open-peeps/${elm.userName}.svg`}
                  />
                </div>
                <div>{elm.userName}</div>
              </Link>
            );
          })}
        </div>
      )}

      {groupLoading ? (
        "loading"
      ) : (
        <div>
          {groupData?.userAllGroup?.map((elm, index) => {
            return (
              <Link
                to={`/chat/${userId}/${elm.id}`}
                key={index}
                className="userData"
              >
                <div className="userProfile">
                  {" "}
                  <Avatar
                    src={`https://avatars.dicebear.com/api/open-peeps/${elm.userName}.svg`}
                  />
                </div>
                <div>{elm.userName}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarChat;
