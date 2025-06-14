import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GoogleSignInLogo from "../assests/web_dark_rd_SU@4x.png";
import { profileManagement } from "../context/ProfileStateManagement";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // to disable button while signing up

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await profileManagement.loginWithGoogle(); // Call Firebase register function
      navigate("/profile"); // Redirect on success
    } catch (err: any) {
      // Show Firebase error message if available
      setError(err.message || "Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center vh-100">
      <h2 className="mb-4">Sign Up fgfg</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSignUp} className="w-50">
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <img src={GoogleSignInLogo} height={50} />
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
