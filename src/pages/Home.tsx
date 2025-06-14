import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignInLogo from "../assests/web_dark_rd_SU@4x.png";
import { profileManagement } from "../context/ProfileStateManagement";
import { BigBoldLetterStyle } from "..";
import { observer } from "mobx-react";

const _Home: React.FC = () => {
  const user = profileManagement.user;
  const navigator = useNavigate();

  if (profileManagement.user) {
    return (
      <h1
        style={BigBoldLetterStyle}
      >{`Hello, ${profileManagement.user.displayName}`}</h1>
    );
  }

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Our App</h1>
      <p className="lead">
        Manage your transactions, view your profile, and more.
      </p>

      {user ? (
        <>
          <h4>Hello, {user.displayName || user.email}!</h4>

          <Button as={Link as any} to="/profile" variant="dark" className="m-2">
            Go to Profile
          </Button>
          <Button
            as={Link as any}
            to="/transactions"
            variant="dark"
            className="m-2"
          >
            View Transactions
          </Button>
        </>
      ) : (
        <>
          <img
            src={GoogleSignInLogo}
            height={50}
            onClick={() => navigator("/login")}
          />
        </>
      )}
    </Container>
  );
};

const Home = observer(_Home);

export default Home;
