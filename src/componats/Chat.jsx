import React, { useEffect, useRef, useState } from "react";
import {
  AttachFile,
  InsertEmoticon,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "../css/chat.css";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  GET_ALL_MESSAGE,
  GET_USER_BY_ID,
  GROUP_ALL_MESSAGE,
  GROUP_BY_ID,
} from "../graphQL/query";
import localStorage from "local-storage";
import {
  CREATE_GROUP_MESSAGE,
  CREATE_MESSAGE,
  DELETE_GROUP_MESSAGE,
  DELETE_MESSAGE,
} from "../graphQL/mutation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  CREATE_GROUP_MESSAGE_SUBSCRIPATION,
  CREATE_MESSAGE_SUBCRIPTION,
  DELETE_GROUP_MESSAGE_SUBSCRIPATION,
  DELETE_MESSAGE_SUBSRIPTION,
  READ_MESSAGE_SUBSCRIPATION,
} from "../graphQL/subscription";

const Chat = () => {
  const { id } = useParams();

  const scrollRef = useRef(null);

  const userId = localStorage.get("loginUserId");

  // *** user messsage create...!!

  const [addMessage] = useMutation(CREATE_MESSAGE);

  const { data: subcripationUserMessageData } = useSubscription(
    CREATE_MESSAGE_SUBCRIPTION
  );

  // *** delete user message...!!

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    refetchQueries: [GET_ALL_MESSAGE, "UserMessage"],
  });

  const { data: deleteUserMessageSubsripation } = useSubscription(
    DELETE_MESSAGE_SUBSRIPTION
  );

  // *** group message create...!!

  const [createGroupMessage] = useMutation(CREATE_GROUP_MESSAGE, {
    refetchQueries: [GROUP_ALL_MESSAGE, "groupAllMessage"],
  });

  const { data: groupMessageSubscripation } = useSubscription(
    CREATE_GROUP_MESSAGE_SUBSCRIPATION
  );

  // *** delete group message...!!

  const [deleteGroupMessage] = useMutation(DELETE_GROUP_MESSAGE, {
    refetchQueries: [GROUP_ALL_MESSAGE, "groupAllMessage"],
  });

  const { data: deleteGroupMessageSubscripation } = useSubscription(
    DELETE_GROUP_MESSAGE_SUBSCRIPATION
  );

  const ref = useRef(null);

  // *** Scroll to the bottom when the component is mounted or updated...!!

  useEffect(() => {
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

  const {
    loading: allMessageLoading,
    refetch: userMessageRefetch,
    data: allMessageData,
  } = useQuery(GET_ALL_MESSAGE, {
    variables: {
      filter: {
        userId: userId,
        reciverId: id,
      },
    },
  });

  const { data: readMessageSubscripation } = useSubscription(
    READ_MESSAGE_SUBSCRIPATION
  );

  const {
    loading: groupAllMessageLoading,
    refetch: groupMeesageRefetch,
    data: groupAllMessage,
  } = useQuery(GROUP_ALL_MESSAGE, {
    variables: {
      groupId: id,
      userId: userId,
    },
  });

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

  const [selectedValuesofCheckbox, setSelectedValuesCheckbox] = useState([]);

  // *** subscripation for real-time update in user and group chat...!!

  useEffect(() => {
    if (subcripationUserMessageData?.messageCreated) {
      userMessageRefetch();
    }

    if (deleteUserMessageSubsripation?.deleteMessage) {
      userMessageRefetch();
    }
    // if (readMessageSubscripation?.) {
    //   userMessageRefetch();
    // }
  }, [subcripationUserMessageData, deleteUserMessageSubsripation]);

  useEffect(() => {
    if (readMessageSubscripation?.readMessage) {
      userMessageRefetch();
    }
  }, []);

  useEffect(() => {
    if (groupMessageSubscripation?.groupMessageCreated) {
      groupMeesageRefetch();
    }

    if (deleteGroupMessageSubscripation?.groupDeleteMessage) {
      groupMeesageRefetch();
    }
  }, [groupMessageSubscripation, deleteGroupMessageSubscripation]);

  // *** create user message and group message...!!

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

  // *** reset from on submit...!!

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

  // delete user Message

  const handaleCheckbox = (e) => {
    if (e.target.checked) {
      setSelectedValuesCheckbox((preValue) => [...preValue, e.target.value]);
    } else {
      setSelectedValuesCheckbox((preValue) =>
        preValue.splice(preValue.indexOf(e.target.value), 1)
      );
    }
  };

  // delete Message

  const deleteMessageFuncation = (e) => {
    if (selectedValuesofCheckbox.length > 0) {
      const confimMessage = window.confirm("Are you sure..?");
      if (confimMessage) {
        if (userByIdData !== undefined) {
          deleteMessage({
            variables: {
              input: {
                messageId: selectedValuesofCheckbox,
                deletedBy: userId,
              },
            },
          });
          setSelectedValuesCheckbox([]);
        } else {
          deleteGroupMessage({
            variables: {
              input: {
                messageId: selectedValuesofCheckbox,
                deletedBy: userId,
              },
            },
          });
          setSelectedValuesCheckbox([]);
        }
      }
    }
  };

  // remove same date from userMessage

  const userAllMessages = allMessageData?.userMessage.reduce((acc, message) => {
    const { createdAt } = message;

    const date = new Date(createdAt);

    const fullDate = date.toLocaleDateString("en-GB");

    if (!acc[fullDate]) {
      acc[fullDate] = message;
    }

    return acc;
  }, {});

  // remove same date from groupMessage

  const groupMessage = groupAllMessage?.groupAllMessage.reduce(
    (acc, message) => {
      const { createdAt } = message;

      const date = new Date(createdAt);

      const fullDate = date.toLocaleDateString("en-GB");

      if (!acc[fullDate]) {
        acc[fullDate] = message;
      }

      return acc;
    },
    {}
  );

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
            ) : userByIdData !== undefined ? (
              <div>
                {Object.keys(userAllMessages).map((date, index) => {
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
                              <div className="chat_message_div">
                                <p
                                  className={` ${
                                    elm.userId.id === userId
                                      ? "chat_reciever chat_message "
                                      : "chat_message"
                                  } `}
                                >
                                  <input
                                    className="mb-2 d-block "
                                    type="checkbox"
                                    value={elm.id}
                                    onChange={handaleCheckbox}
                                  />

                                  {elm.message}
                                  <span className="chat_timestamp">{`${currentHour} : ${currentMinute} ${
                                    currentHour <= 12 ? "Am" : "Pm"
                                  } `}</span>

                                  {elm.userId.id === userId ? (
                                    elm.isread ? (
                                      <span>
                                        <DoneAllIcon
                                          color="primary"
                                          sx={{ width: 17, height: 20 }}
                                        />
                                      </span>
                                    ) : (
                                      <span>
                                        <DoneAllIcon
                                          sx={{ width: 17, height: 20 }}
                                        />
                                      </span>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            ) : groupAllMessageLoading ? (
              <p></p>
            ) : (
              <div>
                {Object.keys(groupMessage).map((date, index) => {
                  return (
                    <div key={index}>
                      <p className="message_date">{date}</p>
                      {groupAllMessage?.groupAllMessage
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
                                  <span className="groupUserName">
                                    <span>{elm.userId.userName}</span>
                                    <span className="chat_timestamp">{`${currentHour} : ${currentMinute} ${
                                      currentHour <= 12 ? "Am" : "Pm"
                                    } `}</span>
                                  </span>
                                  <input
                                    className="mb-2 d-block "
                                    type="checkbox"
                                    value={elm.id}
                                    onChange={handaleCheckbox}
                                  />
                                  {elm.message}
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

            <IconButton onClick={deleteMessageFuncation} className="iconMargin">
              <DeleteIcon />
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
