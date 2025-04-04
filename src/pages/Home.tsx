import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Our App</h1>
      <p className="lead">Manage your transactions, view your profile, and more.</p>
      
      {user ? (
        <>
          <h4>Hello, {user.displayName || user.email}!</h4>
          
          <Button as={Link as any} to="/profile" variant="dark" className="m-2">
            Go to Profile
          </Button>
          <Button as={Link as any} to="/transactions" variant="dark" className="m-2">
            View Transactions
        </Button>
        </>
      ) : (
        <>
          <Button as={Link as any} to="/signup" variant="dark" className="m-2">
            Sign Up
          </Button>
          <Button as={Link as any} to="/login" variant="dark" className="m-2">
            Login
          </Button>
        </>
      )}
    </Container>
  );
};

export default Home;
