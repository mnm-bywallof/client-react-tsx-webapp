import { useState } from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Custom hook to get user and logout method from Auth context
import {
  List,
  HouseDoor,
  Person,
  Receipt,
  BoxArrowInRight,
  BoxArrowRight,
  PersonPlus
} from 'react-bootstrap-icons';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth(); // Get current user info and logout function
  const [collapsed, setCollapsed] = useState(false); // State to track if sidebar is collapsed


  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="d-flex">
      <div className={`custom-sidebar bg-dark text-white d-flex flex-column vh-100 ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header d-flex justify-content-center p-2">
          <Button variant="outline-light" size="sm" onClick={toggleSidebar} className="toggle-btn">
            <List />
          </Button>
        </div>
        <Nav className="flex-column p-2">
          <Nav.Link as={Link} to="/" className="text-white d-flex align-items-center">
            <HouseDoor className="me-2" />
            {!collapsed && 'Home'}
          </Nav.Link>
          <Nav.Link as={Link} to="/profile" className="text-white d-flex align-items-center">
            <Person className="me-2" />
            {!collapsed && 'Profile'}
          </Nav.Link>
          <Nav.Link as={Link} to="/transactions" className="text-white d-flex align-items-center">
            <Receipt className="me-2" />
            {!collapsed && 'Transactions'}
          </Nav.Link>
          {!user && (
            <Nav.Link as={Link} to="/signup" className="text-white d-flex align-items-center">
              <PersonPlus className="me-2" />
              {!collapsed && 'Sign Up'}
            </Nav.Link>
          )}
          {user ? (
            <Nav.Link onClick={logout} className="text-white d-flex align-items-center">
              <BoxArrowRight className="me-2" />
              {!collapsed && 'Logout'}
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login" className="text-white d-flex align-items-center">
              <BoxArrowInRight className="me-2" />
              {!collapsed && 'Login'}
            </Nav.Link>
          )}
        </Nav>
      </div>
      <Container className="p-4 flex-grow-1">{children}</Container>
    </div>
  );
};

export default Layout;
