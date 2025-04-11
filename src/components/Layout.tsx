import { useState } from 'react';
import { Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  List,
  HouseDoor,
  Person,
  Receipt,
  BoxArrowRight,
  PersonPlus
} from 'react-bootstrap-icons';

// Layout component wraps all pages and includes sidebar/offcanvas nav
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);         // Large screen sidebar collapse
  const [showOffcanvas, setShowOffcanvas] = useState(false); // Mobile sidebar visibility

  const toggleSidebar = () => setCollapsed(!collapsed);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  // Shared links between offcanvas and sidebar
  const SidebarNavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Nav.Link as={Link} to="/" className="text-white d-flex align-items-center" onClick={onClick}>
        <HouseDoor className="me-3" />
        <span>Home</span>
      </Nav.Link>
      <Nav.Link as={Link} to="/profile" className="text-white d-flex align-items-center" onClick={onClick}>
        <Person className="me-3" />
        <span>Profile</span>
      </Nav.Link>
      <Nav.Link as={Link} to="/transactions" className="text-white d-flex align-items-center" onClick={onClick}>
        <Receipt className="me-3" />
        <span>Transactions</span>
      </Nav.Link>
      {!user ? (
        <Nav.Link as={Link} to="/signup" className="text-white d-flex align-items-center" onClick={onClick}>
          <PersonPlus className="me-3" />
          <span>Sign Up</span>
        </Nav.Link>
      ) : (
        <Nav.Link onClick={() => { logout(); onClick?.(); }} className="text-white d-flex align-items-center">
          <BoxArrowRight className="me-3" />
          <span>Logout</span>
        </Nav.Link>
      )}
    </>
  );

  return (
    <div className="d-flex">
      {/* Sidebar for large screens */}
      <div
        className={`bg-dark text-white p-3 vh-100 d-none d-lg-block ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
        style={{ width: collapsed ? '60px' : '200px', transition: 'width 0.3s' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span style={{ fontSize: '1.2rem', display: collapsed ? 'none' : 'inline' }}><b>Menu</b></span>
          <Button variant="outline-light" size="sm" onClick={toggleSidebar}>
            <List />
          </Button>
        </div>
        <Nav className="flex-column">
          <SidebarNavLinks />
        </Nav>
      </div>

      {/* Offcanvas sidebar for small screens */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} className="bg-dark text-white d-lg-none">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <SidebarNavLinks onClick={handleClose} />
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main content area */}
      <div className="flex-grow-1">
        {/* Top bar with hamburger for small screens */}
        <div className="bg-dark p-2 d-flex d-lg-none">
          <Button variant="outline-light" onClick={handleShow}>
            <List />
          </Button>
        </div>

        {/* Page content */}
        <div className="p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
