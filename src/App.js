import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "./componats/Wrapper";
import Login from "./componats/Login";
import Register from "./componats/Register";
import ErrorPage from "./componats/ErrorPage";
// import Otp from './componats/Otp';
import ForgotPassword from "./componats/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Wrapper />} />
          <Route path="/chat/:id" element={<Wrapper />} />
          <Route path="/chat/:id/:id" element={<Wrapper />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* <Route path="/verify" element={<Otp />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
