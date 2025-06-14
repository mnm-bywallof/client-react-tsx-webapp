import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { observer } from "mobx-react";
import { profileManagement } from "./context/ProfileStateManagement";
import LogoWhite from "./assests/ONLY RYAN logo b&w.png";
import "bootstrap/dist/css/bootstrap.min.css";

function _App() {
  if (!profileManagement.loaded) {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          width: "100vw",
          background: "whitesmoke",
          color: "black",
          justifyContent: "center",
        }}
      >
        <img src={LogoWhite} width={150} style={{ margin: "auto auto" }} />
      </div>
    );
  }
  if (profileManagement.user) {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Profile />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/wallet" element={<Wallet />} /> */}
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }

  return <Login />;
}

const App = observer(_App);

export default App;
