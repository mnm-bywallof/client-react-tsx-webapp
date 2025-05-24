import { useAuth } from "../context/AuthContext";
import { Container } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p>Please log in</p>;

  return (
    <Container>
      <h2>Profile</h2>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <QRCodeCanvas value={user.uid} size={150} />
    </Container>
  );
};

export default Profile;
