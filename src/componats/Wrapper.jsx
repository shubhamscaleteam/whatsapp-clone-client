import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import '../css/wrapper.css'

const Wrapper = () => {
  return (
    <div>
      <div className="wrapper_body">
        <Sidebar />

        <Chat />
      </div>
    </div>
  );
};

export default Wrapper;
