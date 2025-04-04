import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { registerWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      navigate('/profile');
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2>Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSignUp} className="w-50">
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="dark" type="submit" className="mt-3">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default SignUp;
