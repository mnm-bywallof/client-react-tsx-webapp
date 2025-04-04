import React from 'react';
import { Container, Nav } from 'react-bootstrap';
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
          <Nav.Link as={Link} to="/profile" className="btn btn-primary m-2">Go to Profile</Nav.Link>
          <Nav.Link as={Link} to="/transactions" className="btn btn-success m-2">View Transactions</Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link as={Link} to="/signup" className="btn btn-primary m-2">Sign Up</Nav.Link>
          <Nav.Link as={Link} to="/login" className="btn btn-success m-2">Login</Nav.Link>
        </>
      )}
    </Container>
  );
};

export default Home;
