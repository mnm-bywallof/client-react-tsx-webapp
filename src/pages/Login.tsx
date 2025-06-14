import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GoogleSignInLogo from "../assests/web_dark_rd_SU@4x.png";
import { observer } from "mobx-react";
import { profileManagement } from "../context/ProfileStateManagement";

const _Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileManagement.loginWithGoogle();
      // navigate("/");
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center  vh-100"
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "roboto",
      }}
    >
      <h1 style={{ fontSize: "50px", fontWeight: "bolder" }}>
        One Account. <span style={{ color: "tomato" }}>Fun.</span> Gaming.
        Money. <span style={{ color: "goldenrod" }}>Gambling.</span> Amigos.
        Besties. Gaz'
      </h1>

      <label style={{ padding: "25px" }}>
        Everything is possible with an <b>Only Ryan</b> account.
        {" Read about our "}
        <a href="https://about.onlyryan.com/terms">Terms of Use</a> {" and "}{" "}
        <a href="https://about.onlyryan.com/privacy">Privacy Policy</a> {"."}
      </label>

      <img
        src={GoogleSignInLogo}
        height={50}
        onClick={() => {
          profileManagement.loginWithGoogle();
        }}
      />
    </Container>
  );
};

const Login = observer(_Login);

export default Login;
