import { Container } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import { observer } from "mobx-react";
import { profileManagement } from "../context/ProfileStateManagement";
import { useState } from "react";
import { User } from "firebase/auth";
import { BigBoldLetterStyle } from "..";

const _Profile = () => {
  const [user] = useState<User | undefined>(profileManagement.user);

  if (!user) return <p>Please log in</p>;

  return (
    <Container
      style={{
        textAlign: "center",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          margin: "auto auto",
          height: "80vh",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1 style={BigBoldLetterStyle}>or/Profile</h1>
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <QRCodeCanvas
          value={user.uid}
          size={150}
          style={{ margin: "0px auto" }}
        />
      </div>
    </Container>
  );
};

const Profile = observer(_Profile);

export default Profile;
