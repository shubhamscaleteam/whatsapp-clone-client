import React, { useEffect, useRef, useState } from "react";
import {
  AttachFile,
  InsertEmoticon,
  MicRounded,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "../css/chat.css";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_MESSAGE, GET_USER_BY_ID, GROUP_BY_ID } from "../graphQL/query";
// import { ToastContainer, Zoom, toast } from "react-toastify";
import localStorage from "local-storage";
import { CREATE_GROUP_MESSAGE, CREATE_MESSAGE } from "../graphQL/mutation";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Chat = () => {
  const { id } = useParams();

  const scrollRef = useRef(null);

  // const paramsId = id

  const userId = localStorage.get("loginUserId");

  const [addMessage] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [GET_ALL_MESSAGE, "getAllMessage"],
  });

  const [createGroupMessage] = useMutation(CREATE_GROUP_MESSAGE);

  const ref = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component is mounted or updated
    scrollToBottom();
  });

  const { data: userByIdData, loading: userByIdLoading } = useQuery(
    GET_USER_BY_ID,
    {
      variables: {
        userById: id,
      },
    }
  );
  const { data: groupbyIdData } = useQuery(GROUP_BY_ID, {
    variables: {
      groupId: id,
    },
  });

  const { loading: allMessageLoading, data: allMessageData } = useQuery(
    GET_ALL_MESSAGE,
    {
      variables: {
        filter: {
          userId: userId,
          reciverId: id,
        },
      },
    }
  );

  const [newMessage, setNewMessage] = useState({
    message: "",
    userId: "",
    reciverId: "",
  });

  const [newgroupMessage, setNewgroupMessage] = useState({
    message: "",
    userId: "",
    groupId: "",
  });

  const getMessage = (e) => {
    if (userByIdData !== undefined) {
      setNewMessage({
        message: e.target.value,
        userId: userId,
        reciverId: id,
      });
    } else {
      setNewgroupMessage({
        message: e.target.value,
        userId: userId,
        groupId: id,
      });
    }
  };

  const resetForm = () => {
    ref.current.value = "";
  };

  const getValueOnSubmit = async (e) => {
    e.preventDefault();

    if (userByIdData !== undefined) {
      addMessage({
        variables: {
          input: newMessage,
        },
      });

      resetForm();
    } else {
      // console.log(newgroupMessage)
      createGroupMessage({
        variables: {
          input: newgroupMessage,
        },
      });
    }

    resetForm();
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const groupedMessages = allMessageData?.userMessage.reduce((acc, message) => {
    const { createdAt } = message;

    const date = new Date(createdAt);

    const fullDate = date.toLocaleDateString("en-GB");

    if (!acc[fullDate]) {
      acc[fullDate] = message;
    }

    return acc;
  }, {});

  return (
    <>
      {id ? (
        <div className="chat">
          <div className="chat_header">
            {userByIdLoading ? (
              <Avatar sx={{ width: 50, height: 50 }} />
            ) : userByIdData !== undefined ? (
              <Avatar
                sx={{ width: 50, height: 50 }}
                className="chatUserIcon"
                src={`https://avatars.dicebear.com/api/open-peeps/${userByIdData?.userById?.userName}.svg`}
              />
            ) : (
              <Avatar
                sx={{ width: 50, height: 50 }}
                className="chatUserIcon"
                src={`https://avatars.dicebear.com/api/open-peeps/${groupbyIdData?.groupbyId?.userName}.svg`}
              />
            )}

            <div className="chat_headerInfo">
              {userByIdLoading ? (
                // <h4>Loading..</h4>
                ""
              ) : userByIdData !== undefined ? (
                <div>{userByIdData?.userById?.userName}</div>
              ) : (
                <div>{groupbyIdData?.groupbyId?.userName}</div>
              )}
            </div>

            <div className="chat_headerRight">
              <IconButton>
                {" "}
                <SearchOutlined />
              </IconButton>

              <IconButton>
                <AttachFile />
              </IconButton>

              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>

          <div ref={scrollRef} className="chat_body">
            {allMessageLoading ? (
              <p></p>
            ) : (
              <div>
                {Object.keys(groupedMessages).map((date, index) => {
                  return (
                    <div key={index}>
                      <p className="message_date">{date}</p>
                      {allMessageData?.userMessage
                        .filter((elm) => {
                          const DateOfMessage = new Date(
                            elm.createdAt
                          ).toLocaleDateString("en-GB");

                          return DateOfMessage === date;
                        })
                        .map((elm, index) => {
                          const TIME_AND_DATE = new Date(elm.createdAt);
                          const currentHour = TIME_AND_DATE.getHours();
                          const currentMinute = TIME_AND_DATE.getMinutes();

                          return (
                            <div key={index}>
                              <div>
                                <p
                                  className={` ${
                                    elm.userId.id === userId
                                      ? "chat_reciever chat_message "
                                      : "chat_message"
                                  } `}
                                >
                                  {elm.message}
                                  <span className="chat_timestamp">{`${currentHour} : ${currentMinute} ${
                                    currentHour <= 12 ? "Am" : "Pm"
                                  } `}</span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="chat_footer">
            <IconButton>
              <InsertEmoticon className="iconSize" />
            </IconButton>

            <IconButton className="iconMargin">
              <AttachFile />
            </IconButton>
            <form onSubmit={getValueOnSubmit}>
              <input
                type="text"
                ref={ref}
                name="message"
                placeholder="Type a message"
                onChange={getMessage}
                autoComplete="off"
              />
              <button type="submit">Send a message</button>
            </form>

            <IconButton className="iconMargin">
              <MicRounded />
            </IconButton>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Chat;
