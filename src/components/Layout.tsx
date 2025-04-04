import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex">
      <Navbar bg="dark" variant="dark" className="flex-column vh-100 p-3" style={{ width: '220px' }}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
          {!user && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
          {user ? <Nav.Link onClick={logout}>Logout</Nav.Link> : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
        </Nav>
      </Navbar>
      <Container className="p-4">{children}</Container>
    </div>
  );
};

export default Layout;
