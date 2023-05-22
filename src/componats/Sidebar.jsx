import React, { useState } from "react";

//*** Custome imported files */
import SidebarChat from "./SidebarChat";
import "../css/sidebar.css";

//*** React-router-dom imported files
import { Link, useNavigate } from "react-router-dom";

// *** MaterialUi imported files
import { Avatar, Button, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USER, GET_USER_BY_ID, USER_GROUP } from "../graphQL/query";
import localStorage from "local-storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Offcanvas from "react-bootstrap/Offcanvas";
import { CREATE_GROUP } from "../graphQL/mutation";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDailogbox, setOpenDailogbox] = useState(false);

  const navigate = useNavigate();

  // const { id } = useParams();

  const userId = localStorage.get("loginUserId");

  if (userId === null) {
    navigate("/");
  }

  const { data, loading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userById: userId,
    },
  });

  const allUserQuery = useQuery(GET_ALL_USER);

  const [groupDetails, setGroupDetails] = useState({
    userName: "",
    creator: userId,
    member: [],
  });

  const [groupMembername, setGroupMembername] = useState([]);

  const [groupOfmember] = useMutation(CREATE_GROUP, {
    refetchQueries: [USER_GROUP, "UserAllGroup"],
  });

  const userName = data ? data.userById.userName : "";

  //*** open dropdown on 3 dots...!!
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //*** close dropdown on click...!!
  const handleClose = () => {
    setAnchorEl(null);
  };

  //*** Open and close dailogbox on click...!!

  const openDailog = () => {
    setOpenDailogbox(true);
  };

  const closeDailog = () => {
    setOpenDailogbox(false);
  };

  // *** logout user...!!

  const logOutOnConfirm = () => {
    closeDailog();

    localStorage.clear();

    navigate("/");
  };

  // *** open-close useProfile

  const [show, setShow] = useState(false);

  const userProfileClose = () => setShow(false);

  const userProfileOpen = () => {
    setShow(true);
  };

  //*** on logout button click logout user...!!

  const handaleValue = (e) => {
    if (e === "Logout") {
      //   localStorage.clear("token");
      openDailog();
    }

    if (e === "New group") {
      userProfileOpen();
      // console.log(allUserQuery?.data);
    }

    handleClose();
  };

  const groupNameData = (e) => {
    setGroupDetails({
      ...groupDetails,
      [e.target.name]: e.target.value,
    });
  };

  const setMemberandCretor = (e) => {
    if (!groupDetails.member.includes(e.id)) {
      groupDetails.member.push(e.id);
    }

    if (!groupMembername.includes(e.userName)) {
      groupMembername.push(e.userName);
    }
  };

  const createGroup = (e) => {
    e.preventDefault();

    if (!groupDetails.member.includes(userId)) {
      groupDetails.member.push(userId);
    }

    if (groupDetails.userName === "") {
      console.log("Groupname is empty..!");
    } else {
      userProfileClose();

      groupOfmember({
        variables: {
          input: groupDetails,
        },
      });

      console.log(groupDetails);

      setGroupMembername([]);
    }
  };

  const options = [
    { value: "New group" },
    { value: "New Community" },
    { value: "Starred messages" },
    { value: "Select chat" },
    { value: "Settings" },
    { value: "Logout" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        {loading ? (
          <Avatar />
        ) : (
          <IconButton onClick={userProfileOpen}>
            <Avatar
              className="userProfile"
              src={`https://avatars.dicebear.com/api/open-peeps/${userName}.svg`}
            />
          </IconButton>
        )}

        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {options.map((option, i) => (
                <MenuItem
                  value={option.value}
                  key={i}
                  onClick={() => handaleValue(option.value)}
                >
                  {option.value}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div></div>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon fontSize="large" />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar_chats mb-5">
        <SidebarChat />
      </div>

      {/* ******* Confirm message...!! */}

      <Dialog
        open={openDailogbox}
        maxWidth="lg"
        onClose={closeDailog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Log out?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button ariant="outlined" color="success" onClick={closeDailog}>
            Cancle
          </Button>
          <Button variant="contained" color="success" onClick={logOutOnConfirm}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* ************ Group page  */}

      <Offcanvas show={show}>
        <div className="offcanvasHeader">
          <IconButton onClick={userProfileClose}>
            <ArrowBackIcon className="profileArrow" />
          </IconButton>

          <Offcanvas.Title className="profileHadding">Group </Offcanvas.Title>
        </div>

        <div className="sidebar_search">
          <div className="sidebar_searchContainer">
            <SearchOutlinedIcon fontSize="large" />
            <input placeholder="Add user to" type="text" />
          </div>
        </div>

        {groupMembername.length > 0 ? (
          <div>
            Group Members :{" "}
            {groupMembername
              .map((elm) => {
                return elm;
              })
              .join()}
          </div>
        ) : (
          ""
        )}

        <Offcanvas.Body className="profileBody">
          <div className="sidebarChat">
            {allUserQuery.loading ? (
              "loading"
            ) : (
              <Link>
                {allUserQuery?.data?.allUser.map((elm, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setMemberandCretor(elm)}
                      className="userData"
                    >
                      <div className="userProfile">
                        {" "}
                        <Avatar
                          src={`https://avatars.dicebear.com/api/open-peeps/${elm.userName}.svg`}
                        />
                      </div>
                      <div>{elm.userName}</div>
                    </div>
                  );
                })}
              </Link>
            )}
            <form onSubmit={createGroup} className="">
              <input
                className="offcanvasForm"
                type="text"
                name="userName"
                placeholder="Enter group name"
                autoComplete="off"
                onChange={groupNameData}
              />

              <Button type="submit" variant="outlined" color="success">
                Create group
              </Button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
